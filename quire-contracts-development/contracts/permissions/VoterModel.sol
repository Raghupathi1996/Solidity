pragma solidity ^0.5.3;
// pragma experimental ABIEncoderV2;

import "./MemberHelper.sol";
import "./ListHelper.sol";
import "./MapHelper.sol";
import "./ContractRegistry.sol";

contract VoterModel {

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
    string constant KEY = "VOTER_MANAGER";
    string constant orgNum = "orgNum";
    string constant orgVoterList = "list__orgVoterList";
    string constant VoterOrgIndex = "map__VoterOrgIndex";

    struct PendingOpDetails {
        string orgId;
        string enodeId;
        address account;
        uint256 opType;
    }

    struct Voter {
        address vAccount;
        bool active;
    }

    struct OrgVoterDetails {
        string orgId;
        uint256 voterCount;
        uint256 validVoterCount;
        uint256 voteCount;
        PendingOpDetails pendingOp;
        Voter [] voterList;
        mapping(address => uint256) voterIndex;
        mapping(uint256 => mapping(address => bool)) votingStatus;
    }

    function init() public {
        Member.setUint(KEY,orgNum, 0);
    }

    modifier validVoterListIndex(uint _index) {
        uint length = List.getLength(KEY,orgVoterList);
        require(_index<length, "Index Invalid");
        _;
    }

    modifier onlyVoterManager {
        require(msg.sender==contractRegistry.getRegisteredContract(KEY), "Unauthorized Contract Call");
        _;
    }

    // ----------------------------- READS ----------------------------- //
    
    function getOrgNum() public view
    returns (uint) {
        return Member.getUint(KEY, orgNum);
    }

    function getVoterOrgIndex(bytes32 _key) public view
    returns (uint) {
        return Map.getBytes32ToUint(KEY, VoterOrgIndex, _key);
    }

    function getOrgVoterListLength() public view 
    returns (uint) {
        return List.getLength(KEY, orgVoterList);
    }

    function getOrgVoterDetailsOrgId(uint _index) public view 
    validVoterListIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, orgVoterList, _index, "orgId");
    }

    function getOrgVoterDetailsVoterCount(uint _index) public view 
    validVoterListIndex(_index)
    returns (uint) {
        return List.getPropUint(KEY, orgVoterList, _index, "voterCount");
    }
    
    function getOrgVoterDetailsValidVoterCount(uint _index) public view 
    validVoterListIndex(_index)
    returns (uint) {
        return List.getPropUint(KEY, orgVoterList, _index, "validVoterCount");
    }
    
    function getOrgVoterDetailsVoteCount(uint _index) public view 
    validVoterListIndex(_index)
    returns (uint) {
        return List.getPropUint(KEY, orgVoterList, _index, "voteCount");
    }

    function getOrgVoterDetailsPendingOp(uint _index) public view 
    validVoterListIndex(_index)
    returns (string memory orgId_, string memory enodeId_, address account_, uint opType_) {
        orgId_ = List.getPropString(KEY, orgVoterList, _index, "obj__pendingOp__orgId");
        enodeId_ = List.getPropString(KEY, orgVoterList, _index, "obj__pendingOp__enodeId");
        account_ = List.getPropAddress(KEY, orgVoterList, _index, "obj__pendingOp__account");
        opType_ = List.getPropUint(KEY, orgVoterList, _index, "obj__pendingOp__opType");
    }

    function getOrgVoterDetailsPendingOpType(uint _index) public view 
    validVoterListIndex(_index)
    returns (uint opType_) {
        opType_ = List.getPropUint(KEY, orgVoterList, _index, "obj__pendingOp__opType");
    }

    function getOrgVoterDetailsVoterIndex(uint _index, address _account) public view 
    validVoterListIndex(_index)
    returns (uint) {
        return List.getPropByKeyUint(KEY, orgVoterList, _index, "map__voterIndex", abi.encodePacked(_account));
    }

    function getOrgVoterDetailsVoterListLength(uint _index) public view 
    validVoterListIndex(_index)
    returns (uint) {
        return List.getPropByKeyUint(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked("__length"));
    }

    function getOrgVoterDetailsVoterListItem(uint _index, uint _vIndex) public view 
    validVoterListIndex(_index)
    returns (address vAccount_, bool active_) {
        vAccount_ = List.getPropByKeyAddress(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "vAccount"));
        active_ = List.getPropByKeyBool(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "active"));
    }

    function getOrgVoterDetailsVoterListItemAccount(uint _index, uint _vIndex) public view 
    validVoterListIndex(_index)
    returns (address vAccount_) {
        vAccount_ = List.getPropByKeyAddress(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "vAccount"));
    }

    function getOrgVoterDetailsVoterListItemActive(uint _index, uint _vIndex) public view 
    validVoterListIndex(_index)
    returns (bool active_) {
        active_ = List.getPropByKeyBool(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "active"));
    }

    function getOrgVoterDetailsVotingStatus(uint _index, uint _keyInt, address _keyAddress) public view 
    validVoterListIndex(_index)
    returns (bool) {
        return List.getPropByKeyBool(KEY, orgVoterList, _index, "map__votingStatus", abi.encodePacked(_keyInt, _keyAddress));
    }




    // ----------------------------- WRITES ----------------------------- //
    
    function incOrgNum() public 
    onlyVoterManager {
        uint _orgNum = Member.getUint(KEY, orgNum);
        Member.setUint(KEY, orgNum, _orgNum+1);
    }

    function setVoterOrgIndex(bytes32 _key, uint _index) public 
    onlyVoterManager {
        Map.setBytes32ToUint(KEY, VoterOrgIndex, _key, _index);
    }

    function incOrgVoterListLength() public 
    onlyVoterManager {
        List.incLength(KEY, orgVoterList);
    }

    function setOrgVoterDetailsOrgId(uint _index, string memory _orgId) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropString(KEY, orgVoterList, _index, "orgId", _orgId);
    }

    function setOrgVoterDetailsVoterCount(uint _index, uint _voterCount) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropUint(KEY, orgVoterList, _index, "voterCount", _voterCount);
    }
    
    function setOrgVoterDetailsValidVoterCount(uint _index, uint _validVoterCount) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropUint(KEY, orgVoterList, _index, "validVoterCount", _validVoterCount);
    }
    
    function setOrgVoterDetailsVoteCount(uint _index, uint _voteCount) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropUint(KEY, orgVoterList, _index, "voteCount", _voteCount);
    }

    function setOrgVoterDetailsPendingOp(uint _index, string memory _orgId, string memory _enodeId, address _account, uint _opType) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropString(KEY, orgVoterList, _index, "obj__pendingOp__orgId", _orgId);
        List.setPropString(KEY, orgVoterList, _index, "obj__pendingOp__enodeId", _enodeId);
        List.setPropAddress(KEY, orgVoterList, _index, "obj__pendingOp__account", _account);
        List.setPropUint(KEY, orgVoterList, _index, "obj__pendingOp__opType", _opType);
    }

    function setOrgVoterDetailsVoterIndex(uint _index, address _account, uint _value) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropByKeyUint(KEY, orgVoterList, _index, "map__voterIndex", abi.encodePacked(_account), _value);
    }

    function pushOrgVoterDetailsVoterListItem(uint _index, address _vAccount, bool _active) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        uint length = List.getPropByKeyUint(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked("__length"));
        List.setPropByKeyUint(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked("__length"), 1+length);
        List.setPropByKeyAddress(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(length, "vAccount"), _vAccount);
        List.setPropByKeyBool(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(length, "active"), _active);
    }

    function updateOrgVoterDetailsVoterListItemAccount(uint _index, uint _vIndex, address _vAccount) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropByKeyAddress(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "vAccount"), _vAccount);
    }

    
    function updateOrgVoterDetailsVoterListItemActive(uint _index, uint _vIndex, bool _active) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropByKeyBool(KEY, orgVoterList, _index, "list__voterList", abi.encodePacked(_vIndex, "active"), _active);
    }

    function setOrgVoterDetailsVotingStatus(uint _index, uint _keyInt, address _keyAddress, bool _value) public  
    onlyVoterManager 
    validVoterListIndex(_index) {
        List.setPropByKeyBool(KEY, orgVoterList, _index, "map__votingStatus", abi.encodePacked(_keyInt, _keyAddress), _value);
    }
}