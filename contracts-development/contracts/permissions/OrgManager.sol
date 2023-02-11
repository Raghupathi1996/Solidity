pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "./PermissionsUpgradable.sol";
import "./OrgModel.sol";

/** @title Organization manager contract
  * @notice This contract holds implementation logic for all org management
    functionality. This can be called only by the implementation
    contract only. there are few view functions exposed as public and
    can be called directly. these are invoked by quorum for populating
    permissions data in cache
  * @dev the status of the organization is denoted by a set of integer
    values. These are as below:
        0 - Not in list,
        1 - Org proposed for approval by network admins
        2 - Org in Approved status
        3 - Org proposed for suspension and pending approval by network admins
        4 - Org in Suspended,
     Once the node is blacklisted no further activity on the node is
     possible.
  */
contract OrgManager is OrgStructs {
    string private adminOrgId;
    PermissionsUpgradable private permUpgradable;
    // checks if first time network boot up has happened or not
    bool private networkBoot = false;

    OrgModel private orgModel;

    // events related to Master Org add
    event OrgApproved(
        string _orgId,
        string _porgId,
        string _ultParent,
        uint256 _level,
        uint256 _status
    );
    event OrgPendingApproval(
        string _orgId,
        string _porgId,
        string _ultParent,
        uint256 _level,
        uint256 _status
    );
    event OrgSuspended(
        string _orgId,
        string _porgId,
        string _ultParent,
        uint256 _level
    );
    event OrgSuspensionRevoked(
        string _orgId,
        string _porgId,
        string _ultParent,
        uint256 _level
    );

    /** @notice confirms that the caller is the address of implementation
        contract
    */
    modifier onlyImplementation() {
        require(msg.sender == permUpgradable.getPermImpl(), "invalid caller");
        _;
    }

    /** @notice checks if the org id does not exists
     * @param _orgId - org id
     * @return true if org does not exist
     */
    modifier orgDoesNotExist(string memory _orgId) {
        require(checkOrgExists(_orgId) == false, "org exists");
        _;
    }

    /** @notice checks if the org id does exists
     * @param _orgId - org id
     * @return true if org exists
     */
    modifier orgExists(string memory _orgId) {
        require(checkOrgExists(_orgId) == true, "org does not exist");
        _;
    }

    /** @notice constructor. sets the permissions upgradable address
     */
    constructor(address _permUpgradable, address _orgModel) public {
        orgModel = OrgModel(_orgModel);
        permUpgradable = PermissionsUpgradable(_permUpgradable);
    }

    /** @notice called at the time of network initialization. sets the depth
        breadth for sub orgs creation. and creates the default network
        admin org as per config file
      */
    function setUpOrg(
        string calldata _orgId,
        uint256 _breadth,
        uint256 _depth
    ) external onlyImplementation {
        _addNewOrg("", _orgId, 1, 2);
        orgModel.setDepthLimit(_depth);
        orgModel.setBreadthLimit(_breadth);
    }

    /** @notice function for adding a new master org to the network
     * @param _orgId unique org id to be added
     * @dev org will be added if it does exist
     */
    function addOrg(string calldata _orgId)
        external
        onlyImplementation
        orgDoesNotExist(_orgId)
    {
        _addNewOrg("", _orgId, 1, 1);
    }

    /** @notice function for adding a new sub org under a parent org
     * @param _pOrgId unique org id to be added
     * @dev org will be added if it does exist
     */
    function addSubOrg(string calldata _pOrgId, string calldata _orgId)
        external
        onlyImplementation
        orgDoesNotExist(string(abi.encodePacked(_pOrgId, ".", _orgId)))
    {
        _addNewOrg(_pOrgId, _orgId, 2, 2);
    }

    /** @notice updates the status of a master org.
      * @param _orgId unique org id to be added
      * @param _action action being performed
      * @dev status cannot be updated for sub orgs.
        This function can be called for the following actions:
            1 - to suspend an org
            2 - to activate the org back
      */
    function updateOrg(string calldata _orgId, uint256 _action)
        external
        onlyImplementation
        orgExists(_orgId)
        returns (uint256)
    {
        require(
            (_action == 1 || _action == 2),
            "invalid action. operation not allowed"
        );
        uint256 id = _getOrgIndex(_orgId);
        uint256 level = orgModel.getOrgDetailsLevel(id);
        require(
            (level == 1) || (level == 2),
            "not a master or sub org. operation not allowed"
        );

        uint256 reqStatus;
        uint256 pendingOp = 0;
        if ((_action == 1) && (level == 1)) {
            reqStatus = 2;
            pendingOp = 2;
        } else if ((_action == 2) && (level == 1)) {
            reqStatus = 4;
            pendingOp = 3;
        }
        if ((_action == 1) && (level == 2)) {
            reqStatus = 2;
        } else if ((_action == 2) && (level == 2)) {
            reqStatus = 4;
        }
        require(
            checkOrgStatus(_orgId, reqStatus) == true,
            "org status does not allow the operation"
        );
        if (_action == 1) {
            if (level == 1) {
                _suspendOrg(_orgId);
            }
            if (level == 2) {
                _suspendSubOrg(_orgId);
            }
        } else {
            if (level == 1) {
                _revokeOrgSuspension(_orgId);
            }
            if (level == 2) {
                _revokeSubOrgSuspension(_orgId);
            }
        }
        return pendingOp;
    }

    function updateOrgExternalDetails(
        string calldata _orgId,
        string calldata _name,
        string calldata _location,
        string calldata _url
    ) external onlyImplementation orgExists(_orgId) {
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgExtDetailsName(id, _name);
        orgModel.setOrgExtDetailsLocation(id, _location);
        orgModel.setOrgExtDetailsUrl(id, _url);
    }

    function updateOrgUrl(string calldata _orgId, string calldata _url)
        external
        onlyImplementation
        orgExists(_orgId)
    {
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgExtDetailsUrl(id, _url);
    }

    /** @notice function to approve org status change for master orgs
      * @param _orgId unique org id to be added
      * @param _action approval for action
      * @dev This function can be called for the following actions:
            1 - to suspend an org or immediate suborg to the ADMINORG
            2 - to activate the org or immediate suborg to the ADMINORG back
      */
    function approveOrgStatusUpdate(string calldata _orgId, uint256 _action)
        external
        onlyImplementation
        orgExists(_orgId)
    {
        if (_action == 1) {
            _approveOrgSuspension(_orgId);
        } else {
            _approveOrgRevokeSuspension(_orgId);
        }
    }

    /** @notice function to approve org status change for master orgs
     * @param _orgId unique org id to be added
     */
    function approveOrg(string calldata _orgId) external onlyImplementation {
        require(checkOrgStatus(_orgId, 1) == true, "nothing to approve");
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 2);
        emit OrgApproved(
            orgModel.getOrgDetailsOrgId(id),
            orgModel.getOrgDetailsParentId(id),
            orgModel.getOrgDetailsUltParent(id),
            orgModel.getOrgDetailsLevel(id),
            2
        );
    }

    /** @notice returns org info for a given org index
     * @param _orgIndex org index
     * @return org id
     * @return parent org id
     * @return ultimate parent id
     * @return level in the org tree
     * @return status
     */
    function getOrgInfo(uint256 _orgIndex)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            orgModel.getOrgDetailsOrgId(_orgIndex),
            orgModel.getOrgDetailsParentId(_orgIndex),
            orgModel.getOrgDetailsUltParent(_orgIndex),
            orgModel.getOrgDetailsLevel(_orgIndex),
            orgModel.getOrgDetailsStatus(_orgIndex)
        );
    }

    /** @notice returns org info for a given org id
     * @param _orgId org id
     * @return org id
     * @return parent org id
     * @return ultimate parent id
     * @return level in the org tree
     * @return status
     */
    function getOrgDetails(string calldata _orgId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        if (!checkOrgExists(_orgId)) {
            return (_orgId, "", "", 0, 0);
        }
        uint256 _orgIndex = _getOrgIndex(_orgId);
        return (
            orgModel.getOrgDetailsOrgId(_orgIndex),
            orgModel.getOrgDetailsParentId(_orgIndex),
            orgModel.getOrgDetailsUltParent(_orgIndex),
            orgModel.getOrgDetailsLevel(_orgIndex),
            orgModel.getOrgDetailsStatus(_orgIndex)
        );
    }

    function getOrgExternalDetails(string memory _orgId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        if (!checkOrgExists(_orgId)) {
            return (_orgId, "", "", "");
        }
        uint256 _orgIndex = _getOrgIndex(_orgId);
        return (
            orgModel.getOrgExtDetailsOrgId(_orgIndex),
            orgModel.getOrgExtDetailsName(_orgIndex),
            orgModel.getOrgExtDetailsLocation(_orgIndex),
            orgModel.getOrgExtDetailsUrl(_orgIndex)
        );
    }

    /** @notice returns the array of sub org indexes for the given org
     * @param _orgId org id
     * @return array of sub org indexes
     */
    function getSubOrgIndexes(string calldata _orgId)
        external
        view
        returns (uint256[] memory)
    {
        require(checkOrgExists(_orgId) == true, "org does not exist");
        uint256 _orgIndex = _getOrgIndex(_orgId);
        uint256[] memory subOrgIndexes = orgModel.getOrgDetailsSubOrgIndexList(
            _orgIndex
        );
        return (subOrgIndexes);
    }

    /** @notice returns the master org id for the given org or sub org
     * @param _orgId org id
     * @return master org id
     */
    function getUltimateParent(string calldata _orgId)
        external
        view
        onlyImplementation
        returns (string memory)
    {
        return orgModel.getOrgDetailsUltParent(_getOrgIndex(_orgId));
    }

    /** @notice returns the total number of orgs in the network
     * @return master org id
     */
    function getNumberOfOrgs() public view returns (uint256) {
        return orgModel.getOrgListLength();
    }

    /** @notice confirms that org status is same as passed status
     * @param _orgId org id
     * @param _orgStatus org status
     * @return true or false
     */
    function checkOrgStatus(string memory _orgId, uint256 _orgStatus)
        public
        view
        returns (bool)
    {
        if (orgModel.getOrgIndex(keccak256(abi.encodePacked(_orgId))) == 0) {
            return false;
        }
        uint256 id = _getOrgIndex(_orgId);
        return ((orgModel.getOrgIndex(keccak256(abi.encodePacked(_orgId))) != 0) &&
            orgModel.getOrgDetailsStatus(id) == _orgStatus);
    }

    /** @notice confirms that org status either active or pending suspension
     * @param _orgId org id
     * @return true or false
     */
    function checkOrgActive(string memory _orgId) public view returns (bool) {
        if (orgModel.getOrgIndex(keccak256(abi.encodePacked(_orgId))) != 0) {
            uint256 id = _getOrgIndex(_orgId);
            uint256 status = orgModel.getOrgDetailsStatus(id);
            if (status == 2 || status == 3) {
                uint256 uid = _getOrgIndex(orgModel.getOrgDetailsUltParent(id));
                uint256 ustatus = orgModel.getOrgDetailsStatus(uid);
                if (ustatus == 2 || ustatus == 3) {
                    return true;
                }
            }
        }
        return false;
    }

    /** @notice confirms if the org exists in the network
     * @param _orgId org id
     * @return true or false
     */
    function checkOrgExists(string memory _orgId) public view returns (bool) {
        return (!(orgModel.getOrgIndex(keccak256(abi.encodePacked(_orgId))) == 0));
    }

    /** @notice updates the org status to suspended
     * @param _orgId org id
     */
    function _suspendOrg(string memory _orgId) internal {
        require(
            checkOrgStatus(_orgId, 2) == true,
            "org not in approved status. operation cannot be done"
        );
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 3);
        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgPendingApproval(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level,
            3
        );
    }

    function _suspendSubOrg(string memory _orgId) internal {
        require(
            checkOrgStatus(_orgId, 2) == true,
            "org not in approved status. operation cannot be done"
        );
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 4);
        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgSuspended(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level
        );
    }

    /** @notice revokes the suspension of an org
     * @param _orgId org id
     */
    function _revokeOrgSuspension(string memory _orgId) internal {
        require(
            checkOrgStatus(_orgId, 4) == true,
            "org not in suspended state"
        );
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 5);
        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgPendingApproval(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level,
            5
        );
    }

    function _revokeSubOrgSuspension(string memory _orgId) internal {
        require(
            checkOrgStatus(_orgId, 4) == true,
            "sub org not in suspended state"
        );
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 2);

        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgSuspensionRevoked(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level
        );
    }

    /** @notice approval function for org suspension activity
     * @param _orgId org id
     */
    function _approveOrgSuspension(string memory _orgId) internal {
        require(checkOrgStatus(_orgId, 3) == true, "nothing to approve");
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 4);

        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgSuspended(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level
        );
    }

    /** @notice approval function for revoking org suspension
     * @param _orgId org id
     */
    function _approveOrgRevokeSuspension(string memory _orgId) internal {
        require(checkOrgStatus(_orgId, 5) == true, "nothing to approve");
        uint256 id = _getOrgIndex(_orgId);
        orgModel.setOrgDetailsStatus(id, 2);
        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        emit OrgSuspensionRevoked(
            orgDetails.orgId,
            orgDetails.parentId,
            orgDetails.ultParent,
            orgDetails.level
        );
    }

    /** @notice function to add a new organization
     * @param _pOrgId parent org id
     * @param _orgId org id
     * @param _level level in org hierarchy
     * @param _status status of the org
     */
    function _addNewOrg(
        string memory _pOrgId,
        string memory _orgId,
        uint256 _level,
        uint256 _status
    ) internal {
        bytes32 pid = "";
        bytes32 oid = "";
        uint256 parentIndex = 0;

        if (_level == 1) {
            //root
            oid = keccak256(abi.encodePacked(_orgId));
        } else {
            pid = keccak256(abi.encodePacked(_pOrgId));
            oid = keccak256(abi.encodePacked(_pOrgId, ".", _orgId));
        }
        uint256 orgNum = orgModel.getOrgNum();
        orgModel.incOrgNum();
        orgModel.setOrgIndex(oid, orgNum + 1);
        uint256 id = orgModel.getOrgListLength();
        orgModel.incOrgListLength();
        if (_level == 1) {
            orgModel.setOrgDetailsLevel(id, _level);
            orgModel.setOrgDetailsPindex(id, 0);
            orgModel.setOrgDetailsFullOrgId(id, _orgId);
            orgModel.setOrgDetailsUltParent(id, _orgId);
        } else {
            parentIndex = orgModel.getOrgIndex(pid) - 1;

            require(
                orgModel.getOrgDetailsSubOrgIndexListLength(parentIndex) <
                    orgModel.getBreadthLimit(),
                "breadth level exceeded"
            );
            require(
                orgModel.getOrgDetailsLevel(parentIndex) < orgModel.getDepthLimit(),
                "depth level exceeded"
            );

            orgModel.setOrgDetailsLevel(id, 1 + orgModel.getOrgDetailsLevel(parentIndex));
            orgModel.setOrgDetailsPindex(id, parentIndex);
            orgModel.setOrgDetailsUltParent(
                id,
                orgModel.getOrgDetailsUltParent(parentIndex)
            );
            orgModel.pushOrgDetailsSubOrgListItem(parentIndex, id);
            orgModel.setOrgDetailsFullOrgId(
                id,
                string(abi.encodePacked(_pOrgId, ".", _orgId))
            );
        }
        orgModel.setOrgDetailsOrgId(id, _orgId);
        orgModel.setOrgDetailsParentId(id, _pOrgId);
        orgModel.setOrgDetailsStatus(id, _status);
        orgModel.setOrgExtDetailsOrgId(id, _orgId);
        OrgDetails memory orgDetails = orgModel.getOrgDetailsByIndex(id);
        if (orgDetails.status == 1) {
            emit OrgPendingApproval(
                orgDetails.orgId,
                orgDetails.parentId,
                orgDetails.ultParent,
                orgDetails.level,
                1
            );
        } else {
            emit OrgApproved(
                orgDetails.orgId,
                orgDetails.parentId,
                orgDetails.ultParent,
                orgDetails.level,
                2
            );
        }
    }

    /** @notice returns the org index from the org list for the given org
     * @return org index
     */
    function _getOrgIndex(string memory _orgId) private view returns (uint256) {
        return orgModel.getOrgIndex(keccak256(abi.encodePacked(_orgId))) - 1;
    }

    function getAllOrgs()
        public
        view
        returns (OrgDetails[] memory orgDetailsList, OrgExternalDetails[] memory orgExternalDetailsList)
    {
        orgDetailsList = orgModel.getAllOrgDetails();
        orgExternalDetailsList = orgModel.getAllOrgExternalDetails();
    }
}
