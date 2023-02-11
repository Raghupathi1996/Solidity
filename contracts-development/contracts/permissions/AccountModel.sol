pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "./MemberHelper.sol";
import "./ListHelper.sol";
import "./MapHelper.sol";
import "./ContractRegistry.sol";

contract AccountStructs {
    struct AccountAccessDetails {
        address account;
        string orgId;
        string role;
        uint256 status;
        bool orgAdmin;
    }

    struct AccountExternalDetails {
        address account;
        string name;
        uint256 creationTime;
        uint256 revocationTime;
    }
}

contract AccountModel is AccountStructs {
    MemberHelper Member;
    ListHelper List;
    MapHelper Map;
    ContractRegistry contractRegistry;

    constructor(
        address _Member,
        address _List,
        address _Map,
        address _contractRegistry
    ) public {
        Member = MemberHelper(_Member);
        List = ListHelper(_List);
        Map = MapHelper(_Map);
        contractRegistry = ContractRegistry(_contractRegistry);
    }

    /** @dev The following values should never be updated after first deployment
      * They should be copied without change in case this contract is upgraded
      */
    string constant KEY = "ACCOUNT_MANAGER";
    string constant numAccounts = "numAccounts";
    string constant adminRole = "adminRole";
    string constant orgAdminRole = "orgAdminRole";
    string constant accountAccessList = "list__accountAccessList";
    string constant accountExtDetailsList = "list__accountExtDetailsList";
    string constant accountIndex = "map__accountIndex";
    string constant accountIndexByName = "map__accountIndexByName";
    string constant orgAdminIndex = "map__orgAdminIndex";

    modifier validAccountIndex(uint256 _index) {
        uint256 length = List.getLength(KEY, accountAccessList);
        require(_index < length, "Index Invalid");
        _;
    }

    modifier onlyAccountManager {
        require(msg.sender==contractRegistry.getRegisteredContract(KEY), "Unauthorized Contract Call");
        _;
    }

    // READ

    function getNumAccounts() public view returns (uint256) {
        return Member.getUint(KEY, numAccounts);
    }

    function getAdminRole() public view returns (string memory) {
        return Member.getString(KEY, adminRole);
    }

    function getOrgAdminRole() public view returns (string memory) {
        return Member.getString(KEY, orgAdminRole);
    }

    function getAccountIndex(address _account) public view returns (uint256) {
        return Map.getAddressToUint(KEY, accountIndex, _account);
    }

    function getAccountIndexByName(string memory _name)
        public
        view
        returns (uint256)
    {
        return Map.getStringToUint(KEY, accountIndexByName, _name);
    }

    function getOrgAdminIndex(bytes32 _key) public view returns (address) {
        return Map.getBytes32ToAddress(KEY, orgAdminIndex, _key);
    }

    function getAccountAccessListLength() public view returns (uint256) {
        return List.getLength(KEY, accountAccessList);
    }

    function getAccountAccessDetailsByIndex(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (AccountAccessDetails memory accountAccessDetails)
    {
        accountAccessDetails.account = List.getPropAddress(
            KEY,
            accountAccessList,
            _index,
            "account"
        );
        accountAccessDetails.orgId = List.getPropString(
            KEY,
            accountAccessList,
            _index,
            "orgId"
        );
        accountAccessDetails.role = List.getPropString(
            KEY,
            accountAccessList,
            _index,
            "role"
        );
        accountAccessDetails.status = List.getPropUint(
            KEY,
            accountAccessList,
            _index,
            "status"
        );
        accountAccessDetails.orgAdmin = List.getPropBool(
            KEY,
            accountAccessList,
            _index,
            "orgAdmin"
        );
    }

    function getAllAccountAccessDetails()
        public
        view
        returns (AccountAccessDetails[] memory accountAccessDetailsList)
    {
        uint256 len = getNumAccounts();
        accountAccessDetailsList = new AccountAccessDetails[](len);
        for (uint256 i = 0; i < len; i++) {
            accountAccessDetailsList[i] = getAccountAccessDetailsByIndex(i);
        }
    }

    function getAccountAccessDetailsAccount(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (address)
    {
        return List.getPropAddress(KEY, accountAccessList, _index, "account");
    }

    function getAccountAccessDetailsOrgId(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (string memory)
    {
        return List.getPropString(KEY, accountAccessList, _index, "orgId");
    }

    function getAccountAccessDetailsRole(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (string memory)
    {
        return List.getPropString(KEY, accountAccessList, _index, "role");
    }

    function getAccountAccessDetailsStatus(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (uint256)
    {
        return List.getPropUint(KEY, accountAccessList, _index, "status");
    }

    function getAccountAccessDetailsOrgAdmin(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (bool)
    {
        return List.getPropBool(KEY, accountAccessList, _index, "orgAdmin");
    }

    function getAccountExtDetailsListLength() public view returns (uint256) {
        return List.getLength(KEY, accountExtDetailsList);
    }

    function getAccountExternalDetailsByIndex(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (AccountExternalDetails memory accountExternalDetails)
    {
        accountExternalDetails.account = List.getPropAddress(
            KEY,
            accountExtDetailsList,
            _index,
            "account"
        );
        accountExternalDetails.name = List.getPropString(
            KEY,
            accountExtDetailsList,
            _index,
            "name"
        );
        accountExternalDetails.creationTime = List.getPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "creationTime"
        );
        accountExternalDetails.revocationTime = List.getPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "revocationTime"
        );
    }

    function getAllAccountExternalDetails()
        public
        view
        returns (AccountExternalDetails[] memory accountExternalDetailsList)
    {
        uint256 len = getNumAccounts();
        accountExternalDetailsList = new AccountExternalDetails[](len);
        for (uint256 i = 0; i < len; i++) {
            accountExternalDetailsList[i] = getAccountExternalDetailsByIndex(i);
        }
    }

    function getAccountExtDetailsAccount(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (address)
    {
        return
            List.getPropAddress(KEY, accountExtDetailsList, _index, "account");
    }

    function getAccountExtDetailsName(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (string memory)
    {
        return List.getPropString(KEY, accountExtDetailsList, _index, "name");
    }

    function getAccountExtDetailsCreationTime(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (uint256)
    {
        return
            List.getPropUint(
                KEY,
                accountExtDetailsList,
                _index,
                "creationTime"
            );
    }

    function getAccountExtDetailsRevocationTime(uint256 _index)
        public
        view
        validAccountIndex(_index)
        returns (uint256)
    {
        return
            List.getPropUint(
                KEY,
                accountExtDetailsList,
                _index,
                "revocationTime"
            );
    }

    //WRITE

    function incNumAccounts() public 
    onlyAccountManager {
        Member.setUint(KEY, numAccounts, 1 + Member.getUint(KEY, numAccounts));
    }

    function setAdminRole(string memory _adminRole) public 
    onlyAccountManager {
        Member.setString(KEY, adminRole, _adminRole);
    }

    function setOrgAdminRole(string memory _orgAdminRole) public 
    onlyAccountManager {
        Member.setString(KEY, orgAdminRole, _orgAdminRole);
    }

    function setAccountIndex(address _account, uint256 _index) public 
    onlyAccountManager {
        Map.setAddressToUint(KEY, accountIndex, _account, _index);
    }

    function setAccountIndexByName(string memory _name, uint256 _index) public 
    onlyAccountManager {
        Map.setStringToUint(KEY, accountIndexByName, _name, _index);
    }

    function setOrgAdminIndex(bytes32 _key, address _value) public 
    onlyAccountManager {
        Map.setBytes32ToAddress(KEY, orgAdminIndex, _key, _value);
    }

    function incAccountAccessListLength() public 
    onlyAccountManager {
        List.incLength(KEY, accountAccessList);
    }

    function setAccountAccessDetails(
        uint256 _index,
        address _account,
        string memory _orgId,
        string memory _role,
        uint256 _status,
        bool _orgAdmin
    ) public 
    onlyAccountManager 
    validAccountIndex(_index) {
        List.setPropAddress(
            KEY,
            accountAccessList,
            _index,
            "account",
            _account
        );
        List.setPropString(KEY, accountAccessList, _index, "orgId", _orgId);
        List.setPropString(KEY, accountAccessList, _index, "role", _role);
        List.setPropUint(KEY, accountAccessList, _index, "status", _status);
        List.setPropBool(KEY, accountAccessList, _index, "orgAdmin", _orgAdmin);
    }

    function setAccountAccessDetailsAccount(uint256 _index, address _account)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropAddress(
            KEY,
            accountAccessList,
            _index,
            "account",
            _account
        );
    }

    function setAccountAccessDetailsOrgId(uint256 _index, string memory _orgId)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropString(KEY, accountAccessList, _index, "orgId", _orgId);
    }

    function setAccountAccessDetailsRole(uint256 _index, string memory _role)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        return
            List.setPropString(KEY, accountAccessList, _index, "role", _role);
    }

    function setAccountAccessDetailsStatus(uint256 _index, uint256 _status)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropUint(KEY, accountAccessList, _index, "status", _status);
    }

    function setAccountAccessDetailsOrgAdmin(uint256 _index, bool _orgAdmin)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropBool(KEY, accountAccessList, _index, "orgAdmin", _orgAdmin);
    }

    function incAccountExtDetailsListLength() public 
    onlyAccountManager {
        List.incLength(KEY, accountExtDetailsList);
    }

    function setAccountExtDetails(
        uint256 _index,
        address _account,
        string memory _name,
        uint256 _creationTime,
        uint256 _revocationTime
    ) public  
    onlyAccountManager 
    validAccountIndex(_index) {
        List.setPropAddress(
            KEY,
            accountExtDetailsList,
            _index,
            "account",
            _account
        );
        List.setPropString(KEY, accountExtDetailsList, _index, "name", _name);
        List.setPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "creationTime",
            _creationTime
        );
        List.setPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "revocationTime",
            _revocationTime
        );
    }

    function setAccountExtDetailsAccount(uint256 _index, address _account)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropAddress(
            KEY,
            accountExtDetailsList,
            _index,
            "account",
            _account
        );
    }

    function setAccountExtDetailsName(uint256 _index, string memory _name)
        public 
        onlyAccountManager 
        validAccountIndex(_index)
    {
        List.setPropString(KEY, accountExtDetailsList, _index, "name", _name);
    }

    function setAccountExtDetailsCreationTime(
        uint256 _index,
        uint256 _creationTime
    ) public  
    onlyAccountManager 
    validAccountIndex(_index) {
        List.setPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "creationTime",
            _creationTime
        );
    }

    function setAccountExtDetailsRevocationTime(
        uint256 _index,
        uint256 _revocationTime
    ) public  
    onlyAccountManager 
    validAccountIndex(_index) {
        List.setPropUint(
            KEY,
            accountExtDetailsList,
            _index,
            "revocationTime",
            _revocationTime
        );
    }
}
