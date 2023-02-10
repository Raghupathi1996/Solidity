pragma solidity ^0.5.3;

import "./EternalStorage.sol";

/** @title Map Helper Contract
  * @notice This contract acts as a helper contract to interact with the Eternal Storage contract
  * on behalf of other smart contracts. 
  * A contract can store and retreive a mapping involving different data types by using the map name and key
  */
contract MapHelper {

    EternalStorage etStorage;

   constructor(address _etStorage) public {
        etStorage = EternalStorage(_etStorage);
    }
    
    modifier onlyNetworkContracts {
      require(etStorage.isContractAuthorized(msg.sender), "Storage Access Not Authorized");
      _;
    }

    // ----------------------------- READS ----------------------------- //

    function getAddressToUint(string memory _KEY, string memory _map, address _mapKey) public view
    returns (uint) {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)));
    }
    function getStringToUint(string memory _KEY, string memory _map, string memory _mapKey) public view
    returns (uint)  {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)));
    }
    function getBytes32ToUint(string memory _KEY, string memory _map, bytes32 _mapKey) public view
    returns (uint)  {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)));
    }
    function getBytes32ToAddress(string memory _KEY, string memory _map, bytes32 _mapKey) public view
    returns (address)  {
        return etStorage.getAddress(keccak256(abi.encodePacked(_KEY, _map, _mapKey)));
    }
    
    // ----------------------------- WRITES ----------------------------- //

    function setAddressToUint(string memory _KEY, string memory _map, address _mapKey, uint _value) public 
    onlyNetworkContracts {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)), _value);
    }
    function setStringToUint(string memory _KEY, string memory _map, string memory _mapKey, uint _value) public 
    onlyNetworkContracts {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)), _value);
    }
    function setBytes32ToUint(string memory _KEY, string memory _map, bytes32 _mapKey, uint _value) public 
    onlyNetworkContracts {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _map, _mapKey)), _value);
    }
    function setBytes32ToAddress(string memory _KEY, string memory _map, bytes32 _mapKey, address _value) public 
    onlyNetworkContracts {
        etStorage.setAddress(keccak256(abi.encodePacked(_KEY, _map, _mapKey)), _value);
    }

}