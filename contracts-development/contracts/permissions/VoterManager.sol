pragma solidity ^0.5.3;

import "./PermissionsUpgradable.sol";
import "./VoterModel.sol";

/** @title Voter manager contract
  * @notice This contract holds implementation logic for all account voter and
    voting functionality. This can be called only by the implementation
    contract only. there are few view functions exposed as public and
    can be called directly. these are invoked by quorum for populating
    permissions data in cache
  * @dev each voting record has an attribute operation type (opType)
    which denotes the activity type which is pending approval. This can
    have the following values:
        0 - None - indicates no pending records for the org
        1 - New org add activity  
        2 - Org suspension activity
        3 - Revoke of org suspension
        4 - Assigning admin role for a new account
        5 - Blacklisted node recovery
        6 - Blacklisted account recovery
  */
contract VoterManager {
    
    PermissionsUpgradable private permUpgradable;
    VoterModel private voterModel;

    // events related to managing voting accounts for the org
    event VoterAdded(string _orgId, address _vAccount);
    event VoterDeleted(string _orgId, address _vAccount);

    event VotingItemAdded(string _orgId);
    event VoteProcessed(string _orgId);

    /** @notice confirms that the caller is the address of implementation
        contract
    */
    modifier onlyImplementation {
        require(msg.sender == permUpgradable.getPermImpl(), "invalid caller");
        _;
    }

    /** @notice checks if account is a valid voter record and belongs to the org
        passed
      * @param _orgId - org id
      * @param _vAccount - voter account passed
      */
    modifier voterExists(string memory _orgId, address _vAccount) {
        require(_checkVoterExists(_orgId, _vAccount) == true, "must be a voter");
        _;
    }

    /** @notice constructor. sets the permissions upgradable address
      */
    constructor (address _permUpgradable, address _voterModel) public {
        permUpgradable = PermissionsUpgradable(_permUpgradable);
        voterModel = VoterModel(_voterModel);
    }

    /** @notice function to add a new voter account to the organization
      * @param _orgId org id
      * @param _vAccount - voter account
      * @dev voter capability is currently enabled for network level activities
        only. voting is not available for org related activities
      */
    function addVoter(string calldata _orgId, address _vAccount) external
    onlyImplementation {
        // check if the org exists
        if (voterModel.getVoterOrgIndex(keccak256(abi.encode(_orgId))) == 0) {
            voterModel.incOrgNum();
            voterModel.setVoterOrgIndex(keccak256(abi.encode(_orgId)), voterModel.getOrgNum());
            uint256 id = voterModel.getOrgVoterListLength();
            voterModel.incOrgVoterListLength();
            voterModel.setOrgVoterDetailsOrgId(id, _orgId);
            voterModel.setOrgVoterDetailsVoterCount(id, 1);
            voterModel.setOrgVoterDetailsValidVoterCount(id, 1);
            voterModel.setOrgVoterDetailsVoteCount(id, 0);
            voterModel.setOrgVoterDetailsPendingOp(id, "", "", address(0), 0);
            voterModel.setOrgVoterDetailsVoterIndex(id, _vAccount, voterModel.getOrgVoterDetailsVoterCount(id));
            voterModel.pushOrgVoterDetailsVoterListItem(id, _vAccount, true);
        }
        else {
            uint256 id = _getVoterOrgIndex(_orgId);
            // check if the voter is already present in the list
            if (voterModel.getOrgVoterDetailsVoterIndex(id, _vAccount) == 0) {
                voterModel.setOrgVoterDetailsVoterCount(id, 1+voterModel.getOrgVoterDetailsVoterCount(id));
                voterModel.setOrgVoterDetailsVoterIndex(id, _vAccount, voterModel.getOrgVoterDetailsVoterCount(id));
                voterModel.pushOrgVoterDetailsVoterListItem(id, _vAccount, true);
                voterModel.setOrgVoterDetailsValidVoterCount(id, 1+voterModel.getOrgVoterDetailsValidVoterCount(id));
            }
            else {
                uint256 vid = _getVoterIndex(_orgId, _vAccount);
                require(voterModel.getOrgVoterDetailsVoterListItemActive(id, vid) != true, "already a voter");
                voterModel.updateOrgVoterDetailsVoterListItemActive(id, vid, true);
                voterModel.setOrgVoterDetailsValidVoterCount(id, 1+voterModel.getOrgVoterDetailsValidVoterCount(id));
            }

        }
        emit VoterAdded(_orgId, _vAccount);
    }

    /** @notice function to delete a voter account from the organization
      * @param _orgId org id
      * @param _vAccount - voter account
      * @dev voter capability is currently enabled for network level activities
        only. voting is not available for org related activities
      */
    function deleteVoter(string calldata _orgId, address _vAccount) external
    onlyImplementation
    voterExists(_orgId, _vAccount) {
        uint256 id = _getVoterOrgIndex(_orgId);
        uint256 vId = _getVoterIndex(_orgId, _vAccount);
        voterModel.setOrgVoterDetailsValidVoterCount(id, voterModel.getOrgVoterDetailsValidVoterCount(id)-1);
        voterModel.updateOrgVoterDetailsVoterListItemActive(id, vId, false);
        emit VoterDeleted(_orgId, _vAccount);
    }

    /** @notice function to a voting item for network admin accounts to vote
      * @param _authOrg org id of the authorizing org. it will be network admin org
      * @param _orgId - org id for which the voting record is being created
      * @param _enodeId - enode id for which the voting record is being created
      * @param _account - account id for which the voting record is being created
      * @param _pendingOp - operation for which voting is being done
      */
    function addVotingItem(string calldata _authOrg, string calldata _orgId,
        string calldata _enodeId, address _account, uint256 _pendingOp)
    external onlyImplementation {
        // check if anything is pending approval for the org.
        // If yes another item cannot be added
        require((_checkPendingOp(_authOrg, 0)),
            "items pending for approval. new item cannot be added");
        uint256 id = _getVoterOrgIndex(_authOrg);
        voterModel.setOrgVoterDetailsPendingOp(id, _orgId, _enodeId, _account, _pendingOp);
        // initialize vote status for voter accounts
        for (uint256 i = 0; i < voterModel.getOrgVoterDetailsVoterListLength(id); i++) {
            if (voterModel.getOrgVoterDetailsVoterListItemActive(id, i)) {
                voterModel.setOrgVoterDetailsVotingStatus(id, id, voterModel.getOrgVoterDetailsVoterListItemAccount(id, i), false);
            }
        }
        // set vote count to zero
        voterModel.setOrgVoterDetailsVoteCount(id, 0);
        emit VotingItemAdded(_authOrg);

    }

    /** @notice function processing vote of a voter account
      * @param _authOrg org id of the authorizing org. it will be network admin org
      * @param _vAccount - account id of the voter
      * @param _pendingOp - operation which is being approved
      * @return success of the voter process. either true or false
      */
    function processVote(string calldata _authOrg, address _vAccount, uint256 _pendingOp)
    external onlyImplementation voterExists(_authOrg, _vAccount) returns (bool) {
        // check something if anything is pending approval
        require(_checkPendingOp(_authOrg, _pendingOp) == true, "nothing to approve");
        uint256 id = _getVoterOrgIndex(_authOrg);
        // check if vote is already processed
        require(voterModel.getOrgVoterDetailsVotingStatus(id, id, _vAccount) != true, "cannot double vote");
        voterModel.setOrgVoterDetailsVoteCount(id, 1+voterModel.getOrgVoterDetailsVoteCount(id));
        voterModel.setOrgVoterDetailsVotingStatus(id, id, _vAccount, true);
        emit VoteProcessed(_authOrg);
        if (voterModel.getOrgVoterDetailsVoteCount(id) > voterModel.getOrgVoterDetailsValidVoterCount(id) / 2) {
            // majority achieved, clean up pending op
            voterModel.setOrgVoterDetailsPendingOp(id, "", "", address(0), 0);
            return true;
        }
        return false;
    }

    /** @notice returns the details of any pending operation to be approved
      * @param _orgId org id. this will be the org id of network admin org
      */
    function getPendingOpDetails(string calldata _orgId) external view
    onlyImplementation returns (string memory, string memory, address, uint256){
        uint256 orgIndex = _getVoterOrgIndex(_orgId);
        return voterModel.getOrgVoterDetailsPendingOp(orgIndex);
    }

    /** @notice checks if the voter account exists and is linked to the org
      * @param _orgId org id
      * @param _vAccount voter account id
      * @return true or false
      */
    function _checkVoterExists(string memory _orgId, address _vAccount)
    internal view returns (bool){
        uint256 orgIndex = _getVoterOrgIndex(_orgId);
        if (voterModel.getOrgVoterDetailsVoterIndex(orgIndex, _vAccount) == 0) {
            return false;
        }
        uint256 voterIndex = _getVoterIndex(_orgId, _vAccount);
        return voterModel.getOrgVoterDetailsVoterListItemActive(orgIndex, voterIndex);
    }

    /** @notice checks if the pending operation exists or not
      * @param _orgId org id
      * @param _pendingOp type of operation
      * @return true or false
      */
    function _checkPendingOp(string memory _orgId, uint256 _pendingOp)
    internal view returns (bool){
        return (voterModel.getOrgVoterDetailsPendingOpType(_getVoterOrgIndex(_orgId)) == _pendingOp);
    }

    /** @notice returns the voter account index
      */
    function _getVoterIndex(string memory _orgId, address _vAccount)
    internal view returns (uint256) {
        uint256 orgIndex = _getVoterOrgIndex(_orgId);
        return voterModel.getOrgVoterDetailsVoterIndex(orgIndex, _vAccount) - 1;
    }

    /** @notice returns the org index for the org from voter list
      */
    function _getVoterOrgIndex(string memory _orgId)
    internal view returns (uint256) {
        return voterModel.getVoterOrgIndex(keccak256(abi.encode(_orgId))) - 1;
    }

}
