pragma solidity ^0.5.3;
// pragma experimental ABIEncoderV2;

import "./EternalStorage.sol";

/** @title Member Helper Contract
  * @notice This contract acts as a helper contract to interact with the Eternal Storage contract
  * on behalf of other smart contracts. 
  * A contract can store and retreive its member variables of basic data types (excluding list, mapping, structs) by using the name of the variable
  */
contract MemberHelper {

    EternalStorage etStorage;

    constructor(address _etStorage) public {
        etStorage = EternalStorage(_etStorage);
    }

    modifier onlyNetworkContracts {
      require(etStorage.isContractAuthorized(msg.sender), "Storage Access Not Authorized");
      _;
    }

    // ----------------------------- uint ----------------------------- //
    function getUint(string memory _KEY, string memory _member) public view
    returns(uint) {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _member)));
    }
    function incUint(string memory _KEY, string memory _member) public {
        uint value = etStorage.getUint(keccak256(abi.encodePacked(_KEY, _member)));
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _member)), value+1);
    }
    function setUint(string memory _KEY, string memory _member, uint _value) public {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _member)), _value);
    }

    // ----------------------------- uint16 ----------------------------- //
    function getUint16(string memory _KEY, string memory _member) public view
    returns(uint16) {
        return etStorage.getUint16(keccak256(abi.encodePacked(_KEY, _member)));
    }
    function incUint16(string memory _KEY, string memory _member) public 
    onlyNetworkContracts {
        uint16 value = etStorage.getUint16(keccak256(abi.encodePacked(_KEY, _member)));
        etStorage.setUint16(keccak256(abi.encodePacked(_KEY, _member)), value+1);
    }
    function setUint16(string memory _KEY, string memory _member, uint16 _value) public 
    onlyNetworkContracts {
        etStorage.setUint16(keccak256(abi.encodePacked(_KEY, _member)), _value);
    }
    
    // ----------------------------- string ----------------------------- //
    function getString(string memory _KEY, string memory _member) public view
    returns(string memory) {
        return etStorage.getString(keccak256(abi.encodePacked(_KEY, _member)));
    }
    function setString(string memory _KEY, string memory _member, string memory _value) public 
    onlyNetworkContracts {
        etStorage.setString(keccak256(abi.encodePacked(_KEY, _member)), _value);
    }

}