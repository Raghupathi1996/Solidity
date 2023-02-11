pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import "./MemberHelper.sol";
import "./ListHelper.sol";
import "./MapHelper.sol";
import "./ContractRegistry.sol";

contract OrgStructs {
    struct OrgDetails {
        string orgId;
        uint status;
        string parentId;
        string fullOrgId;
        string ultParent;
        uint pindex;
        uint level;
        uint [] subOrgIndexList;
    }

    struct OrgExternalDetails {
        string orgId;
        string name;
        string location;
        string url;
    }

    function abiDecodeOrgExtDetails(bytes memory _bytes) public pure returns(OrgExternalDetails memory orgExtDetails_) {
        (orgExtDetails_.orgId, orgExtDetails_.name, orgExtDetails_.location, orgExtDetails_.url)
         = abi.decode(_bytes, (string, string, string, string));
    }
    function abiEncodeOrgExtDetails(OrgExternalDetails memory _orgExtDetails) public pure returns(bytes memory bytes_) {
        bytes_ = abi.encode(_orgExtDetails.orgId, _orgExtDetails.name, _orgExtDetails.location, _orgExtDetails.url);
    }
}

contract OrgModel is OrgStructs {

    MemberHelper Member;
    ListHelper List;
    MapHelper Map;
    ContractRegistry contractRegistry;

    /** @dev The following values should never be updated after first deployment
      * They should be copied without change in case this contract is upgraded
      */
    string constant KEY = "ORG_MANAGER";
    // variables which control the breadth and depth of the sub org tree
    string constant DEPTH_LIMIT = "DEPTH_LIMIT";
    string constant BREADTH_LIMIT = "BREADTH_LIMIT";
    string constant orgNum = "orgNum";
    string constant orgList = "list__orgList";
    string constant orgExtDetailsList = "list__orgExtDetailsList";
    string constant OrgIndex = "map__OrgIndex";

    modifier validOrgListIndex(uint _index) {
        uint length = List.getLength(KEY,orgList);
        require(_index<length, "Index Invalid");
        _;
    }

    modifier onlyOrgManager {
        require(msg.sender==contractRegistry.getRegisteredContract(KEY), "Unauthorized Contract Call");
        _;
    }

    constructor(address _Member, address _List, address _Map, address _contractRegistry) public {
        Member = MemberHelper(_Member);
        List = ListHelper(_List);
        Map = MapHelper(_Map);
        contractRegistry = ContractRegistry(_contractRegistry);
    }

    function getDepthLimit() public view 
    returns(uint) {
        return Member.getUint(KEY, DEPTH_LIMIT);
    }

    function getBreadthLimit() public view 
    returns(uint) {
        return Member.getUint(KEY, BREADTH_LIMIT);
    }

    function getOrgIndex(bytes32 _key) public view 
    returns(uint) {
        return Map.getBytes32ToUint(KEY, OrgIndex, _key);
    }

    function getOrgNum() public view
    returns (uint) {
        return Member.getUint(KEY, orgNum);
    }

    function getOrgListLength() public view 
    returns(uint) {
        return List.getLength(KEY, orgList);
    }

    function getOrgDetailsByIndex(uint _index) public view
    validOrgListIndex(_index) 
    returns (OrgDetails memory orgDetails) {
        orgDetails.orgId = List.getPropString(KEY, orgList, _index, "orgId");
        orgDetails.status = List.getPropUint(KEY, orgList, _index, "status");
        orgDetails.parentId = List.getPropString(KEY, orgList, _index, "parentId");
        orgDetails.fullOrgId = List.getPropString(KEY, orgList, _index, "fullOrgId");
        orgDetails.ultParent = List.getPropString(KEY, orgList, _index, "ultParent");
        orgDetails.pindex = List.getPropUint(KEY, orgList, _index, "pindex");
        orgDetails.level = List.getPropUint(KEY, orgList, _index, "level");
        orgDetails.subOrgIndexList = getOrgDetailsSubOrgIndexList(_index);
    }

     function getAllOrgDetails() public view returns (OrgDetails[] memory orgDetailsList) {
         uint len = getOrgNum();
         orgDetailsList = new OrgDetails[](len);
         for(uint i=0;i<len;i++) {
             orgDetailsList[i] = getOrgDetailsByIndex(i);
         }
     }

    function getOrgExternalDetailsByIndex(uint _index) public view
    validOrgListIndex(_index) 
    returns (OrgExternalDetails memory orgExternalDetails) {
        orgExternalDetails.orgId = List.getPropString(KEY, orgExtDetailsList, _index, "orgId");
        orgExternalDetails.name = List.getPropString(KEY, orgExtDetailsList, _index, "name");
        orgExternalDetails.location = List.getPropString(KEY, orgExtDetailsList, _index, "location");
        orgExternalDetails.url = List.getPropString(KEY, orgExtDetailsList, _index, "url");
    }

    function getAllOrgExternalDetails() public view returns (OrgExternalDetails[] memory orgExternalDetailsList) {
         uint len = getOrgNum();
         orgExternalDetailsList = new OrgExternalDetails[](len);
         for(uint i=0;i<len;i++) {
             orgExternalDetailsList[i] = getOrgExternalDetailsByIndex(i);
         }
     }

    function getOrgDetailsOrgId(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgList, _index, "orgId");
    }

    function getOrgDetailsStatus(uint _index) public view 
    validOrgListIndex(_index) 
    returns (uint) {
        return List.getPropUint(KEY, orgList, _index, "status");
    }

    function getOrgDetailsParentId(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgList, _index, "parentId");
    }

    function getOrgDetailsFullOrgId(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgList, _index, "fullOrgId");
    }

    function getOrgDetailsUltParent(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgList, _index, "ultParent");
    }

    function getOrgDetailsPindex(uint _index) public view 
    validOrgListIndex(_index) 
    returns (uint) {
        return List.getPropUint(KEY, orgList, _index, "pindex");
    }

    function getOrgDetailsLevel(uint _index) public view 
    validOrgListIndex(_index) 
    returns (uint) {
        return List.getPropUint(KEY, orgList, _index, "level");
    }

    function getOrgDetailsSubOrgIndexList(uint _index) public view 
    validOrgListIndex(_index) 
    returns (uint[] memory) {
        uint length = List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"));
        uint[] memory indices = new uint[](length);
        for (uint i = 0; i < length; i++) {
            indices[i] = List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked(i));
        }
        return indices;
    }

    function getOrgDetailsSubOrgIndexListItem(uint _index, uint _sIndex) public view 
    validOrgListIndex(_index) 
    returns (uint) {
        return List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked(_sIndex));
    }

    function getOrgDetailsSubOrgIndexListLength(uint _index) public view 
    validOrgListIndex(_index) 
    returns (uint) {
        return List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"));
    }

    function getOrgExtDetailsOrgId(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgExtDetailsList, _index, "orgId");
    }

    function getOrgExtDetailsName(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgExtDetailsList, _index, "name");
    }

    function getOrgExtDetailsLocation(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgExtDetailsList, _index, "location");
    }

    function getOrgExtDetailsUrl(uint _index) public view 
    validOrgListIndex(_index) 
    returns (string memory) {
        return List.getPropString(KEY, orgExtDetailsList, _index, "url");
    }

    // WRITE

    function setDepthLimit(uint _value) public 
    onlyOrgManager {
        Member.setUint(KEY, DEPTH_LIMIT, _value);
    }

    function setBreadthLimit(uint _value) public 
    onlyOrgManager {
        Member.setUint(KEY, BREADTH_LIMIT, _value);
    }
    
    function incOrgNum() public 
    onlyOrgManager {
        Member.incUint(KEY, orgNum);
    }

    function incOrgListLength() public 
    onlyOrgManager {
        List.incLength(KEY, orgList);
        List.incLength(KEY, orgExtDetailsList);
    }

    function setOrgIndex(bytes32 _key, uint _value) public 
    onlyOrgManager {
        Map.setBytes32ToUint(KEY, OrgIndex, _key, _value);
    }
    
    function setOrgDetailsOrgId(uint _index, string memory _orgId) public 
    onlyOrgManager  
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgList, _index, "orgId", _orgId);
    }

    function setOrgDetailsStatus(uint _index, uint _status) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropUint(KEY, orgList, _index, "status", _status);
    }

    function setOrgDetailsParentId(uint _index, string memory _parentId) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgList, _index, "parentId", _parentId);
    }

    function setOrgDetailsFullOrgId(uint _index, string memory _fullOrgId) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgList, _index, "fullOrgId", _fullOrgId);
    }

    function setOrgDetailsUltParent(uint _index, string memory _ultParent) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgList, _index, "ultParent", _ultParent);
    }

    function setOrgDetailsPindex(uint _index, uint _pindex) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropUint(KEY, orgList, _index, "pindex", _pindex);
    }

    function setOrgDetailsLevel(uint _index, uint _level) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropUint(KEY, orgList, _index, "level", _level);
    }

    function pushOrgDetailsSubOrgListItem(uint _index, uint _value) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        uint length = List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"));
        List.setPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"), 1+length);
        List.setPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked(length), _value);
    }

    function setOrgExtDetailsOrgId(uint _index, string memory _orgId) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgExtDetailsList, _index, "orgId", _orgId);
    }

    function setOrgExtDetailsName(uint _index, string memory _name) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgExtDetailsList, _index, "name", _name);
    }

    function setOrgExtDetailsLocation(uint _index, string memory _location) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgExtDetailsList, _index, "location", _location);
    }

    function setOrgExtDetailsUrl(uint _index, string memory _url) public  
    onlyOrgManager 
    validOrgListIndex(_index) {
        return List.setPropString(KEY, orgExtDetailsList, _index, "url", _url);
    }

    function incOrgDetailsSubOrgIndexListLength(uint _index) public 
    onlyOrgManager {
        uint length = List.getPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"));
        List.setPropByKeyUint(KEY, orgList, _index, "list__subOrgIndexList", abi.encodePacked("__length"), 1+length);
    }
}