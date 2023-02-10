pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "./PermissionsUpgradable.sol";
import "./AccountModel.sol";

/** @title Account manager contract
  * @notice This contract holds implementation logic for all account management
    functionality. This can be called only by the implementation contract only.
    there are few view functions exposed as public and can be called directly.
    these are invoked by quorum for populating permissions data in cache
  * @dev account status is denoted by a fixed integer value. The values are
    as below:
        0 - Not in list
        1 - Account pending approval
        2 - Active
        3 - Inactive
        4 - Suspended
        5 - Blacklisted
        6 - Revoked
        7 - Recovery Initiated for blacklisted accounts and pending approval
            from network admins
     Once the account is blacklisted no further activity on the account is
     possible.
     When adding a new org admin account to an existing org, the existing org
     admin account will be in revoked status and can be assigned a new role
     later
  */
contract AccountManager is AccountStructs {
    PermissionsUpgradable private permUpgradable;
    AccountModel private accountModel;

    // account permission events
    event AccountAccessModified(address _account, string _orgId, string _roleId, bool _orgAdmin, uint _status);
    event AccountAccessRevoked(address _account, string _orgId, string _roleId, bool _orgAdmin);
    event AccountStatusChanged(address _account, string _orgId, uint _status);

    event AccountNameAdded(address _account, string _name);

    /** @notice confirms that the caller is the address of implementation
        contract
      */
    modifier onlyImplementation {
        require(msg.sender == permUpgradable.getPermImpl(), "invalid caller");
        _;
    }

    /** @notice checks if the account is exists and belongs to the org id passed
      * @param _orgId - org id
      * @param _account - account id
      */
    modifier accountExists(string memory _orgId, address _account) {
        require(accountModel.getAccountIndex(_account) != 0, "account does not exists");
        require(keccak256(abi.encode(accountModel.getAccountAccessDetailsOrgId(_getAccountIndex(_account)))) == keccak256(abi.encode(_orgId)), "account in different org");
        _;
    }

    /// @notice constructor. sets the permissions upgradable address
    constructor (address _permUpgradable, address _accountModel) public {
        permUpgradable = PermissionsUpgradable(_permUpgradable);
        accountModel = AccountModel(_accountModel);
    }


    /** @notice returns the account details for a given account
      * @param _account account id
      * @return account id
      * @return org id of the account
      * @return role linked to the account
      * @return status of the account
      * @return bool indicating if the account is an org admin
      */
    function getAccountDetails(address _account) external view returns (address,
        string memory, string memory, uint, bool){
        if (accountModel.getAccountIndex(_account) == 0) {
            return (_account, "NONE", "", 0, false);
        }
        uint aIndex = _getAccountIndex(_account);
        AccountAccessDetails memory accountAccessDetails = accountModel.getAccountAccessDetailsByIndex(aIndex);
        return (accountAccessDetails.account, accountAccessDetails.orgId,
        accountAccessDetails.role, accountAccessDetails.status,
        accountAccessDetails.orgAdmin);
    }

    function getAccountExternalDetails(string calldata _name) external view returns (address account_,
        string memory name_, string memory orgId_, string memory role_, uint status_, bool orgAdmin_, uint creationTime_, uint revocationTime_){
        if (accountModel.getAccountIndexByName(_name) == 0) {
            return (address(0), _name, "", "", 0, false, 0, 0);
        }
        uint aIndex = _getAccountIndexByName(_name);
        AccountAccessDetails memory accountAccessDetails = accountModel.getAccountAccessDetailsByIndex(aIndex);
        account_ = accountAccessDetails.account;
        orgId_ = accountAccessDetails.orgId;
        role_ = accountAccessDetails.role;
        status_ = accountAccessDetails.status;
        orgAdmin_ = accountAccessDetails.orgAdmin;
        AccountExternalDetails memory accountExternalDetails = accountModel.getAccountExternalDetailsByIndex(aIndex);
        name_ = accountExternalDetails.name;
        creationTime_ = accountExternalDetails.creationTime;
        revocationTime_ = accountExternalDetails.revocationTime;
    }

    /** @notice returns the account details for a given account if account is valid/active
      * @param _account account id
      * @return org id of the account
      * @return role linked to the account
      */
    function getAccountOrgRole(address _account) external view
    returns (string memory, string memory){
        if (accountModel.getAccountIndex(_account) == 0) {
            return ("NONE", "");
        }
        uint aIndex = _getAccountIndex(_account);
        return (accountModel.getAccountAccessDetailsOrgId(aIndex), 
            accountModel.getAccountAccessDetailsRole(aIndex));
    }

    /** @notice returns the account details a given account index
      * @param  _aIndex account index
      * @return account id
      * @return org id of the account
      * @return role linked to the account
      * @return status of the account
      * @return bool indicating if the account is an org admin
      */
    function getAccountDetailsFromIndex(uint _aIndex) external view returns
    (address, string memory, string memory, uint, bool) {
        AccountAccessDetails memory accountAccessDetails = accountModel.getAccountAccessDetailsByIndex(_aIndex);
        return (accountAccessDetails.account, accountAccessDetails.orgId,
        accountAccessDetails.role, accountAccessDetails.status,
        accountAccessDetails.orgAdmin);
    }

    /** @notice returns the total number of accounts
      * @return total number accounts
      */
    function getNumberOfAccounts() external view returns (uint) {
        return accountModel.getAccountAccessListLength();
    }

    /** @notice this is called at the time of network initialization to set
        the default values of network admin and org admin roles
      */
    function setDefaults(string calldata _nwAdminRole, string calldata _oAdminRole)
    external onlyImplementation {
        accountModel.setAdminRole(_nwAdminRole);
        accountModel.setOrgAdminRole(_oAdminRole);
    }

    /** @notice this function is called to assign the org admin or network
        admin roles only to the passed account
      * @param _account - account id
      * @param _orgId - org to which it belongs
      * @param _roleId - role id to be assigned
      * @param _status - account status to be assigned
      */
    function assignAdminRole(address _account, string calldata _orgId,
        string calldata _roleId, uint _status) external onlyImplementation {
        require(((keccak256(abi.encode(_roleId)) == keccak256(abi.encode(accountModel.getOrgAdminRole()))) ||
        (keccak256(abi.encode(_roleId)) == keccak256(abi.encode(accountModel.getAdminRole())))),
            "can be called to assign admin roles only");

        _setAccountRole(_account, _orgId, _roleId, _status, true);

    }

    /** @notice this function is called to assign the any role to the passed
        account.
      * @param _account - account id
      * @param _orgId - org to which it belongs
      * @param _roleId - role id to be assigned
      * @param _adminRole - indicates of the role is an admin role
      */
    function assignAccountRole(address _account, string calldata _orgId,
        string calldata _roleId, bool _adminRole) external onlyImplementation {
        require(((keccak256(abi.encode(_roleId)) != keccak256(abi.encode(accountModel.getAdminRole())))
        && (keccak256(abi.encode(abi.encode(_roleId))) != keccak256(abi.encode(accountModel.getOrgAdminRole())))),
            "cannot be called fro assigning org admin and network admin roles");
        _setAccountRole(_account, _orgId, _roleId, 2, _adminRole);
    }

    /** @notice this function is called to assign name to the passed
        account. The passed _account should exist and should not have a name assigned to it already.
        The passed _name should not be empty and should not be already assigned to another account.
      * @param _account - account id
      * @param _name - username to be added
      */
    function assignAccountName(address _account, string calldata _name) external onlyImplementation {
        require(bytes(_name).length>0, "Name cannot be empty");
        require(accountModel.getAccountIndex(_account)>0, "Account not assigned");
        uint newAccountIndex = _getAccountIndex(_account);
        require(bytes(accountModel.getAccountExtDetailsName(newAccountIndex)).length==0, "Account already has name");
        if(accountModel.getAccountIndexByName(_name)>0){ //Name already assigned
            uint oldAccountIndex = _getAccountIndexByName(_name);
            accountModel.setAccountExtDetailsName(oldAccountIndex, "");
        }
        accountModel.setAccountIndexByName(_name, 1+newAccountIndex);
        accountModel.setAccountExtDetailsName(newAccountIndex, _name);
        emit AccountNameAdded(_account, _name);
    }

    /** @notice this function removes existing admin account. will be called at
        the time of adding a new account as org admin account. at org
        level there can be one org admin account only
      * @param _orgId - org id
      * @return bool to indicate if voter update is required or not
      * @return _adminRole - indicates of the role is an admin role
      */
    function removeExistingAdmin(string calldata _orgId) external
    onlyImplementation
    returns (bool voterUpdate, address account) {
        // change the status of existing org admin to revoked
        if (orgAdminExists(_orgId)) {
            uint id = _getAccountIndex(accountModel.getOrgAdminIndex(keccak256(abi.encode(_orgId))));
            accountModel.setAccountAccessDetailsStatus(id, 6);
            accountModel.setAccountAccessDetailsOrgAdmin(id, false);
            AccountAccessDetails memory accountAccessDetails = accountModel.getAccountAccessDetailsByIndex(id);
            emit AccountAccessModified(accountAccessDetails.account, accountAccessDetails.orgId, accountAccessDetails.role, accountAccessDetails.orgAdmin, accountAccessDetails.status);
            return ((keccak256(abi.encode(accountAccessDetails.role)) == keccak256(abi.encode(accountModel.getAdminRole()))), accountAccessDetails.account);
        }
        return (false, address(0));
    }

    /** @notice function to add an account as network admin or org admin.
      * @param _orgId - org id
      * @param _account - account id
      * @return bool to indicate if voter update is required or not
      */
    function addNewAdmin(string calldata _orgId, address _account) external
    onlyImplementation
    returns (bool voterUpdate) {
        // check of the account role is org admin role and status is pending
        // approval. if yes update the status to approved
        string memory role = getAccountRole(_account);
        uint status = getAccountStatus(_account);
        uint id = _getAccountIndex(_account);
        if ((keccak256(abi.encode(role)) == keccak256(abi.encode(accountModel.getOrgAdminRole()))) &&
            (status == 1)) {
            accountModel.setOrgAdminIndex(keccak256(abi.encode(_orgId)), _account);
        }
        accountModel.setAccountAccessDetailsStatus(id, 2);
        accountModel.setAccountAccessDetailsOrgAdmin(id, true);
        AccountAccessDetails memory accountAccessDetails = accountModel.getAccountAccessDetailsByIndex(id);
        emit AccountAccessModified(accountAccessDetails.account, accountAccessDetails.orgId, accountAccessDetails.role, accountAccessDetails.orgAdmin, accountAccessDetails.status);
        return (keccak256(abi.encode(accountAccessDetails.role)) == keccak256(abi.encode(accountModel.getAdminRole())));
    }

    /** @notice updates the account status to the passed status value
      * @param _orgId - org id
      * @param _account - account id
      * @param _action - new status of the account
      * @dev the following actions are allowed
            1 - Suspend the account
            2 - Reactivate a suspended account
            3 - Blacklist an account
            4 - Initiate recovery for black listed account
            5 - Complete recovery of black listed account and update status to active
      */
    function updateAccountStatus(string calldata _orgId, address _account, uint _action) external
    onlyImplementation
    accountExists(_orgId, _account) {
        require((_action > 0 && _action < 6), "invalid status change request");

        // check if the account is org admin. if yes then do not allow any status change
        require(checkOrgAdmin(_account, _orgId, "") != true, "status change not possible for org admin accounts");
        uint newStatus;
        if (_action == 1) {
            // for suspending an account current status should be active
            require(accountModel.getAccountAccessDetailsStatus(_getAccountIndex(_account)) == 2,
                "account is not in active status. operation cannot be done");
            newStatus = 4;
        }
        else if (_action == 2) {
            // for reactivating a suspended account, current status should be suspended
            require(accountModel.getAccountAccessDetailsStatus(_getAccountIndex(_account)) == 4,
                "account is not in suspended status. operation cannot be done");
            newStatus = 2;
        }
        else if (_action == 3) {
            require(accountModel.getAccountAccessDetailsStatus(_getAccountIndex(_account)) != 5,
                "account is already blacklisted. operation cannot be done");
            accountModel.setAccountExtDetailsRevocationTime(_getAccountIndex(_account), block.timestamp);
            newStatus = 5;
        }
        else if (_action == 4) {
            require(accountModel.getAccountAccessDetailsStatus(_getAccountIndex(_account)) == 5,
                "account is not blacklisted. operation cannot be done");
            newStatus = 7;
        }
        else if (_action == 5) {
            require(accountModel.getAccountAccessDetailsStatus(_getAccountIndex(_account)) == 7, "account recovery not initiated. operation cannot be done");
            newStatus = 2;
        }

        accountModel.setAccountAccessDetailsStatus(_getAccountIndex(_account), newStatus);
        emit AccountStatusChanged(_account, _orgId, newStatus);
    }

    /** @notice checks if the passed account exists and if exists does it
        belong to the passed organization.
      * @param _account - account id
      * @param _orgId - org id
      * @return bool true if the account does not exists or exists and belongs
      * @return passed org
      */
    function validateAccount(address _account, string calldata _orgId) external
    view returns (bool){
        if (accountModel.getAccountIndex(_account) == 0) {
            return true;
        }
        uint256 id = _getAccountIndex(_account);
        return (keccak256(abi.encode(accountModel.getAccountAccessDetailsOrgId(id))) == keccak256(abi.encode(_orgId)));
    }

    function validateAccountAssigned(address _account, string calldata _orgId) external
    view returns (bool){
        if (accountModel.getAccountIndex(_account) == 0) {
            return false;
        }
        uint256 id = _getAccountIndex(_account);
        return (keccak256(abi.encode(accountModel.getAccountAccessDetailsOrgId(id))) == keccak256(abi.encode(_orgId)));
    }

    /** @notice checks if org admin account exists for the passed org id
      * @param _orgId - org id
      * @return true if the org admin account exists and is approved
      */
    function orgAdminExists(string memory _orgId) public view returns (bool) {
        if (accountModel.getOrgAdminIndex(keccak256(abi.encode(_orgId))) != address(0)) {
            address adminAcct = accountModel.getOrgAdminIndex(keccak256(abi.encode(_orgId)));
            return getAccountStatus(adminAcct) == 2;
        }
        return false;

    }

    /** @notice returns the role id linked to the passed account
      * @param _account account id
      * @return role id
      */
    function getAccountRole(address _account) public view returns (string memory) {
        if (accountModel.getAccountIndex(_account) == 0) {
            return "NONE";
        }
        uint256 acctIndex = _getAccountIndex(_account);
        if (accountModel.getAccountAccessDetailsStatus(acctIndex) != 0) {
            return accountModel.getAccountAccessDetailsRole(acctIndex);
        }
        else {
            return "NONE";
        }
    }

    /** @notice returns the account status for a given account
      * @param _account account id
      * @return account status
      */
    function getAccountStatus(address _account) public view returns (uint256) {
        if (accountModel.getAccountIndex(_account) == 0) {
            return 0;
        }
        uint256 aIndex = _getAccountIndex(_account);
        return (accountModel.getAccountAccessDetailsStatus(aIndex));
    }

    /** @notice returns the account name for a given account
      * @param _account account id
      * @return account name
      */
    function getAccountName(address _account) public view returns (string memory) {
        if (accountModel.getAccountIndex(_account) == 0) {
            return "";
        }
        uint256 aIndex = _getAccountIndex(_account);
        return accountModel.getAccountExtDetailsName(aIndex);
    }

    /** @notice returns the account address for a given account name
      * @param _accountName account name
      * @return account address
      */
    function getAccountAddress(string memory _accountName) public view returns (address) {
        if (accountModel.getAccountIndexByName(_accountName) == 0) {
            return address(0);
        }
        uint256 aIndex = _getAccountIndexByName(_accountName);
        return accountModel.getAccountAccessDetailsAccount(aIndex);
    }


    /** @notice checks if the account is a org admin for the passed org or
        for the ultimate parent organization
      * @param _account account id
      * @param _orgId org id
      * @param _ultParent master org id or
      */
    function checkOrgAdmin(address _account, string memory _orgId,
        string memory _ultParent) public view returns (bool) {
        // check if the account role is network admin. If yes return success
        if (keccak256(abi.encode(getAccountRole(_account))) == keccak256(abi.encode(accountModel.getAdminRole()))) {
            // check of the orgid is network admin org. then return true
            uint256 id = _getAccountIndex(_account);
            return ((keccak256(abi.encode(accountModel.getAccountAccessDetailsOrgId(id))) == keccak256(abi.encode(_orgId)))
            || (keccak256(abi.encode(accountModel.getAccountAccessDetailsOrgId(id))) == keccak256(abi.encode(_ultParent))));
        }
        return ((accountModel.getOrgAdminIndex(keccak256(abi.encode(_orgId))) == _account) || (accountModel.getOrgAdminIndex(keccak256(abi.encode(_ultParent))) == _account));
    }

    /** @notice returns the index for a given account id
      * @param _account account id
      * @return account index
      */
    function _getAccountIndex(address _account) internal view returns (uint256) {
        return accountModel.getAccountIndex(_account) - 1;
    }

    function _getAccountIndexByName(string memory _name) internal view returns (uint256) {
        return accountModel.getAccountIndexByName(_name) - 1;
    }

    /** @notice sets the account role to the passed role id and sets the status
      * @param _account account id
      * @param _orgId org id
      * @param _status status to be set
      * @param _oAdmin bool to indicate if account is org admin
      */
    function _setAccountRole(address _account, string memory _orgId,
        string memory _roleId, uint256 _status, bool _oAdmin) internal onlyImplementation {
        // Check if account already exists
        if (accountModel.getAccountIndex(_account) != 0) {
            uint256 aIndex = _getAccountIndex(_account);
            accountModel.setAccountAccessDetailsRole(aIndex, _roleId);
            accountModel.setAccountAccessDetailsStatus(aIndex, _status);
            accountModel.setAccountAccessDetailsOrgAdmin(aIndex, _oAdmin);
        }
        else {
            uint numAccounts = accountModel.getNumAccounts();
            accountModel.incNumAccounts();
            accountModel.setAccountIndex(_account, 1+numAccounts);
            accountModel.incAccountAccessListLength();
            accountModel.incAccountExtDetailsListLength();
            accountModel.setAccountAccessDetails(numAccounts, _account, _orgId, _roleId, _status, _oAdmin);
            accountModel.setAccountExtDetails(numAccounts, _account, "", block.timestamp, 0);
        }
        emit AccountAccessModified(_account, _orgId, _roleId, _oAdmin, _status);
    }

    function getAccountsForOrg(string memory _orgId) public view 
        returns (AccountAccessDetails[] memory accountAccessDetailsList, AccountExternalDetails[] memory accountExternalDetailsList)
    {
        uint len = accountModel.getNumAccounts();
        uint[] memory filteredIndex = new uint[](len);
        uint filteredCount = 0;
        for(uint i=0;i<len;i++) {
            string memory orgId = accountModel.getAccountAccessDetailsOrgId(i);
            if(keccak256(abi.encodePacked((orgId))) == keccak256(abi.encodePacked((_orgId)))) {
                filteredIndex[filteredCount] = i;
                filteredCount += 1;
            }
        }
        accountAccessDetailsList = new AccountAccessDetails[](filteredCount);
        accountExternalDetailsList = new AccountExternalDetails[](filteredCount);
        for(uint i=0;i<filteredCount;i++) {
            accountAccessDetailsList[i] = accountModel.getAccountAccessDetailsByIndex(filteredIndex[i]);
            accountExternalDetailsList[i] = accountModel.getAccountExternalDetailsByIndex(filteredIndex[i]);
        }
    }

    function isAccountNameRegistered(string memory _name) public view returns (bool) {
        return (accountModel.getAccountIndexByName(_name) != 0);
    }

}