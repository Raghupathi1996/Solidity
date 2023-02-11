pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "./MemberHelper.sol";
import "./ListHelper.sol";
import "./MapHelper.sol";
import "./ContractRegistry.sol";

contract RoleStructs {
    struct RoleDetails {
        string roleId;
        string orgId;
        uint256 baseAccess;
        bool isVoter;
        bool isAdmin;
        bool active;
    }
    function abiDecodeRoleDetails(bytes memory _bytes) public pure returns(RoleDetails memory roleDetails_) {
        (roleDetails_.roleId, roleDetails_.orgId, roleDetails_.baseAccess, roleDetails_.isVoter, roleDetails_.isAdmin, roleDetails_.active)
         = abi.decode(_bytes, (string, string, uint256, bool, bool, bool));
    }
    function abiEncodeRoleDetails(RoleDetails memory _roleDetails) public pure returns(bytes memory bytes_) {
        bytes_ = abi.encode(_roleDetails.roleId, _roleDetails.orgId, _roleDetails.baseAccess, _roleDetails.isVoter, _roleDetails.isAdmin, _roleDetails.active);
    }
}

contract RoleModel is RoleStructs {

    MemberHelper Member;
    ListHelper List;
    MapHelper Map;
    ContractRegistry contractRegistry;

    constructor(address _Member, address _List, address _Map, address _contractRegistry) public {
        Member = MemberHelper(_Member);
        List = ListHelper(_List);
        Map = MapHelper(_Map);
        contractRegistry = ContractRegistry(_contractRegistry);
    }

    /** @dev The following values should never be updated after first deployment
      * They should be copied without change in case this contract is upgraded
      */
    string constant KEY = "ROLE_MANAGER";
    string constant numberOfRoles = "_numberOfRoles";
    string constant roleList = "list__roleList";
    string constant roleIndex = "map__roleIndex";

    function init() public {
        Member.setUint(KEY,numberOfRoles, 0);
    }

    modifier validRoleIndex(uint _index) {
        uint length = List.getLength(KEY,roleList);
        require(_index<length, "Index Invalid");
        _;
    }

    modifier onlyRoleManager {
        require(msg.sender==contractRegistry.getRegisteredContract(KEY), "Unauthorized Contract Call");
        _;
    }

    // ----------------------------- READS ----------------------------- //
    
    function getNumberOfRoles() public view
    returns (uint) {
        return Member.getUint(KEY, numberOfRoles);
    }

    function getRoleByIndex(uint _index) public view
    validRoleIndex(_index)
    returns(string memory, string memory, uint, bool, bool, bool) 
    {
        RoleDetails memory _ = RoleDetails({
            roleId: List.getPropString(KEY,roleList, _index, "roleId"),
            orgId: List.getPropString(KEY,roleList, _index, "orgId"),
            baseAccess: List.getPropUint(KEY,roleList, _index, "baseAccess"), 
            isVoter: List.getPropBool(KEY,roleList, _index, "isVoter"), 
            isAdmin: List.getPropBool(KEY,roleList, _index, "isAdmin"),
            active: List.getPropBool(KEY,roleList, _index, "active")
        });
        return (_.roleId,_.orgId,_.baseAccess,_.isVoter,_.isAdmin,_.active);
    }

    function getRoleRoleId(uint _index) public view 
    validRoleIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, roleList, _index, "roleId");
    }

    function getRoleOrgId(uint _index) public view 
    validRoleIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, roleList, _index, "orgId");
    }    

    function getRoleBaseAccess(uint _index) public view 
    validRoleIndex(_index)
    returns (uint) {
        return List.getPropUint(KEY, roleList, _index, "baseAccess");
    }

    function getRoleIsVoter(uint _index) public view 
    validRoleIndex(_index)
    returns (bool) {
        return List.getPropBool(KEY, roleList, _index, "isVoter");
    }

    function getRoleIsAdmin(uint _index) public view 
    validRoleIndex(_index)
    returns (bool) {
        return List.getPropBool(KEY, roleList, _index, "isAdmin");
    }

    function getRoleActive(uint _index) public view 
    validRoleIndex(_index)
    returns (bool) {
        return List.getPropBool(KEY, roleList, _index, "active");
    }

    function getRoleIndex(bytes32 _roleId) public view 
    returns (uint) {
        return Map.getBytes32ToUint(KEY, roleIndex, _roleId);
    }

    // ----------------------------- WRITES ----------------------------- //
    
    function incNumberOfRoles() public 
    onlyRoleManager {
        uint _numberOfRoles = Member.getUint(KEY, numberOfRoles);
        Member.setUint(KEY, numberOfRoles, _numberOfRoles+1);
    }

    function pushRole(string memory roleId, string memory orgId, uint baseAccess, bool isVoter, bool isAdmin, bool active) public  
    onlyRoleManager 
    {
        uint index = List.getLength(KEY,roleList);
        List.incLength(KEY,roleList);
        setRoleRoleId(index,roleId);
        setRoleOrgId(index,orgId);
        setRoleBaseAccess(index,baseAccess);
        setRoleIsVoter(index,isVoter);
        setRoleIsAdmin(index,isAdmin);
        setRoleActive(index,active);
    }

    function setRoleRoleId(uint _index, string memory _value) public 
    onlyRoleManager 
    validRoleIndex(_index) {
        return List.setPropString(KEY, roleList, _index, "roleId", _value);
    }

    function setRoleOrgId(uint _index, string memory _value) public 
    onlyRoleManager 
    validRoleIndex(_index) {
        return List.setPropString(KEY, roleList, _index, "orgId", _value);
    }

    function setRoleBaseAccess(uint _index, uint _value) public 
    onlyRoleManager 
    validRoleIndex(_index){
        return List.setPropUint(KEY, roleList, _index, "baseAccess", _value);
    }

    function setRoleIsVoter(uint _index, bool _value) public 
    onlyRoleManager 
    validRoleIndex(_index){
        return List.setPropBool(KEY, roleList, _index, "isVoter", _value);
    }

    function setRoleIsAdmin(uint _index, bool _value) public 
    onlyRoleManager 
    validRoleIndex(_index){
        return List.setPropBool(KEY, roleList, _index, "isAdmin", _value);
    }

    function setRoleActive(uint _index, bool _value) public 
    onlyRoleManager 
    validRoleIndex(_index){
        return List.setPropBool(KEY, roleList, _index, "active", _value);
    }

    function setRoleIndex(bytes32 _roleId, uint _index) public 
    onlyRoleManager {
        return Map.setBytes32ToUint(KEY, roleIndex, _roleId, _index);
    } 

}