pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "./MemberHelper.sol";
import "./ListHelper.sol";
import "./MapHelper.sol";
import "./ContractRegistry.sol";


contract NodeStructs{
    struct NodeDetails {
        string orgId;
        string enodeId;
        string ip;
        uint16 port;
        uint16 raftPort;
        uint status;
    }
    function abiDecodeNodeDetails(bytes memory _bytes) public pure returns(NodeDetails memory nodeDetails_) {
        (nodeDetails_.orgId, nodeDetails_.enodeId, nodeDetails_.ip, nodeDetails_.port, nodeDetails_.raftPort, nodeDetails_.status)
         = abi.decode(_bytes, (string, string, string, uint16, uint16, uint));
    }
    function abiEncodeNodeDetails(NodeDetails memory _nodeDetails) public pure returns(bytes memory bytes_) {
        bytes_ = abi.encode(_nodeDetails.orgId, _nodeDetails.enodeId, _nodeDetails.ip, _nodeDetails.port, _nodeDetails.raftPort, _nodeDetails.status);
    }
}

contract NodeModel is NodeStructs {

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
    string constant KEY = "NODE_MANAGER";
    string constant numberOfNodes = "numberOfNodes";
    string constant nodeList = "list__nodeList";
    string constant nodeIdToIndex = "map__nodeIdToIndex";
    string constant enodeIdToIndex = "map__enodeIdToIndex";

    modifier validNodeIndex(uint _index) {
        uint length = List.getLength(KEY,nodeList);
        require(_index<length, "Index Invalid");
        _;
    }

    modifier onlyNodeManager {
        require(msg.sender==contractRegistry.getRegisteredContract(KEY), "Unauthorized Contract Call");
        _;
    }

    // ----------------------------- READS ----------------------------- //
    
    function getNumberOfNodes() public view
    returns (uint) {
        return Member.getUint(KEY, numberOfNodes);
    }

    function getNodeByIndex(uint _index) public view
    validNodeIndex(_index)
    returns(string memory, string memory, string memory, uint16, uint16, uint) 
    {
        NodeDetails memory _ = NodeDetails({
            orgId: List.getPropString(KEY,nodeList, _index, "orgId"),
            enodeId: List.getPropString(KEY,nodeList, _index, "enodeId"),
            ip: List.getPropString(KEY,nodeList, _index, "ip"), 
            port: List.getPropUint16(KEY,nodeList, _index, "port"), 
            raftPort: List.getPropUint16(KEY,nodeList, _index, "raftPort"),
            status: List.getPropUint(KEY,nodeList, _index, "status")
        });
        return (_.orgId,_.enodeId,_.ip,_.port,_.raftPort,_.status);
    }

    function getNodeOrgId(uint _index) public view 
    validNodeIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, nodeList, _index, "orgId");
    }

    function getNodeEnodeId(uint _index) public view 
    validNodeIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, nodeList, _index, "enodeId");
    }    

    function getNodeIp(uint _index) public view 
    validNodeIndex(_index)
    returns (string memory) {
        return List.getPropString(KEY, nodeList, _index, "ip");
    }

    function getNodePort(uint _index) public view 
    validNodeIndex(_index)
    returns (uint16) {
        return List.getPropUint16(KEY, nodeList, _index, "port");
    }

    function getNodeRaftPort(uint _index) public view 
    validNodeIndex(_index)
    returns (uint16) {
        return List.getPropUint16(KEY, nodeList, _index, "raftPort");
    }

    function getNodeStatus(uint _index) public view 
    validNodeIndex(_index)
    returns (uint) {
        return List.getPropUint(KEY, nodeList, _index, "status");
    }

    function getNodeIdToIndex(bytes32 _nodeId) public view 
    returns (uint) {
        return Map.getBytes32ToUint(KEY, nodeIdToIndex, _nodeId);
    } 

    function getEnodeIdToIndex(bytes32 _enodeId) public view 
    returns (uint) {
        return Map.getBytes32ToUint(KEY, enodeIdToIndex, _enodeId);
    }

    // ----------------------------- WRITES ----------------------------- //
    
    function incNumberOfNodes() public 
    onlyNodeManager {
        uint _numberOfNodes = Member.getUint(KEY, numberOfNodes);
        Member.setUint(KEY, numberOfNodes, _numberOfNodes+1);
    }

    function pushNode(string memory orgId, string memory enodeId, string memory ip, uint16 port, uint16 raftPort, uint status) public 
    onlyNodeManager {
        uint index = List.getLength(KEY,nodeList);
        List.incLength(KEY,nodeList);
        setNodeOrgId(index,orgId);
        setNodeEnodeId(index,enodeId);
        setNodeIp(index,ip);
        setNodePort(index,port);
        setNodeRaftPort(index,raftPort);
        setNodeStatus(index,status);
    }

    function setNodeOrgId(uint _index, string memory _value) public 
    onlyNodeManager 
    validNodeIndex(_index) {
        return List.setPropString(KEY, nodeList, _index, "orgId", _value);
    }

    function setNodeEnodeId(uint _index, string memory _value) public 
    onlyNodeManager 
    validNodeIndex(_index) {
        return List.setPropString(KEY, nodeList, _index, "enodeId", _value);
    }    

    function setNodeIp(uint _index, string memory _value) public 
    onlyNodeManager 
    validNodeIndex(_index){
        return List.setPropString(KEY, nodeList, _index, "ip", _value);
    }

    function setNodePort(uint _index, uint16 _value) public 
    onlyNodeManager 
    validNodeIndex(_index){
        return List.setPropUint16(KEY, nodeList, _index, "port", _value);
    }

    function setNodeRaftPort(uint _index, uint16 _value) public 
    onlyNodeManager 
    validNodeIndex(_index){
        return List.setPropUint16(KEY, nodeList, _index, "raftPort", _value);
    }

    function setNodeStatus(uint _index, uint _value) public 
    onlyNodeManager 
    validNodeIndex(_index) {
        return List.setPropUint(KEY, nodeList, _index, "status", _value);
    }

    function setNodeIdToIndex(bytes32 _nodeId, uint _index) public 
    onlyNodeManager {
        return Map.setBytes32ToUint(KEY, nodeIdToIndex, _nodeId, _index);
    } 

    function setEnodeIdToIndex(bytes32 _enodeId, uint _index) public 
    onlyNodeManager {
        return Map.setBytes32ToUint(KEY, enodeIdToIndex, _enodeId, _index);
    }


}