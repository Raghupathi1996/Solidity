pragma solidity ^0.5.3;

import "./EternalStorage.sol";

/** @title List Helper Contract
  * @notice This contract acts as a helper contract to interact with the Eternal Storage contract
  * on behalf of other smart contracts. 
  * A contract can store and retreive a list of objects. 
  * Each object property of an object at a specific index has to be stored and retreived individually.
  * There are functions provided in this contract to do so for different data types. 
  */
contract ListHelper {
      
    EternalStorage etStorage;

    constructor(address _etStorage) public {
        etStorage = EternalStorage(_etStorage);
    }

    modifier onlyNetworkContracts {
      require(etStorage.isContractAuthorized(msg.sender), "Storage Access Not Authorized");
      _;
    }

    // ----------------------------- READS ----------------------------- //

    /** @notice Returns list length
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      */
    function getLength(string memory _KEY, string memory _list) public view
    returns(uint) {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _list, "__length")));
    }

    /** @notice returns list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      */
    function getPropAddress(string memory _KEY, string memory _list, uint _index, string memory _prop) public view 
    returns (address) {
        return etStorage.getAddress(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)));
    }

    /** @notice returns list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      */
    function getPropBool(string memory _KEY, string memory _list, uint _index, string memory _prop) public view 
    returns (bool) {
        return etStorage.getBool(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)));
    }

    /** @notice returns list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      */
    function getPropString(string memory _KEY, string memory _list, uint _index, string memory _prop) public view 
    returns (string memory) {
        return etStorage.getString(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)));
    }

    /** @notice returns list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      */
    function getPropUint(string memory _KEY, string memory _list, uint _index, string memory _prop) public view 
    returns (uint) {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)));
    }

    /** @notice returns list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      */
    function getPropUint16(string memory _KEY, string memory _list, uint _index, string memory _prop) public view 
    returns (uint16) {
        return etStorage.getUint16(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)));
    }

    /** @notice returns list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we find the required uint 
      */
    function getPropByKeyUint(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey) public view 
    returns (uint) {
        return etStorage.getUint(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)));
    }

    /** @notice returns list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we find the required string 
      */
    function getPropByKeyString(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey) public view 
    returns (string memory) {
        return etStorage.getString(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)));
    }

    /** @notice returns list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we find the required address 
      */
    function getPropByKeyAddress(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey) public view 
    returns (address) {
        return etStorage.getAddress(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)));
    }

    /** @notice returns list item complex property
      * @dev if one of the properties of a list item is a complex data type (object, list or map), 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_objPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we find the required bool 
      */
    function getPropByKeyBool(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey) public view 
    returns (bool) {
        return etStorage.getBool(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)));
    }
    
    // ----------------------------- WRITES ----------------------------- //

    /** @notice increments list length
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      */
    function incLength(string memory _KEY, string memory _list) public {
        uint length = etStorage.getUint(keccak256(abi.encodePacked(_KEY, _list, "__length")));
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _list, "__length")), length+1);
    }

    /** @notice sets list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      * @param _value value to be stored
      */
    function setPropAddress(string memory _KEY, string memory _list, uint _index, string memory _prop, address _value) public 
    onlyNetworkContracts {
        etStorage.setAddress(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)), _value);
    }

    /** @notice sets list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      * @param _value value to be stored
      */
    function setPropBool(string memory _KEY, string memory _list, uint _index, string memory _prop, bool _value) public 
    onlyNetworkContracts {
        etStorage.setBool(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)), _value);
    }
    
    /** @notice sets list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      * @param _value value to be stored
      */
    function setPropString(string memory _KEY, string memory _list, uint _index, string memory _prop, string memory _value) public 
    onlyNetworkContracts {
        etStorage.setString(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)), _value);
    }

    /** @notice sets list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      * @param _value value to be stored
      */
    function setPropUint(string memory _KEY, string memory _list, uint _index, string memory _prop, uint _value) public 
    onlyNetworkContracts {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)), _value);
    }

    /** @notice sets list item property
      * @param _KEY Contract Name or Other defined key
      * @param _list name of the list prepended with list__
      * @param _index index in the list
      * @param _prop name of the property
      * @param _value value to be stored
      */
    function setPropUint16(string memory _KEY, string memory _list, uint _index, string memory _prop, uint16 _value) public 
    onlyNetworkContracts {
        etStorage.setUint16(keccak256(abi.encodePacked(_KEY, _list, _index, _prop)), _value);
    }

    /** @notice sets list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we locate the final uint 
      * @param _value value to be stored
      */
    function setPropByKeyUint(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey, uint _value) public 
    onlyNetworkContracts {
        etStorage.setUint(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)), _value);
    }

    
    /** @notice sets list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we locate the final string 
      * @param _value value to be stored
      */
    function setPropByKeyString(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey, string memory _value) public 
    onlyNetworkContracts {
        etStorage.setString(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)), _value);
    }

    
    /** @notice sets list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we locate the final address 
      * @param _value value to be stored
      */
    function setPropByKeyAddress(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey, address _value) public 
    onlyNetworkContracts {
        etStorage.setAddress(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)), _value);
    }

    
    /** @notice sets list item complex property
      * @dev if one of the properties of a list item is a complex data type like list or map, 
      * we pass a _propKey along with the _prop, prop name.
      * @param _prop Name of the property prepended with obj__ for object, list__ for list and map__ for map
      * @param _propKey For object, it is abi.encodePacked(_innerObjPropName, _innerPropKey);
      * For list, it is abi.encodePacked(_index, _innerPropKey)
      * For map, it is abi.encodePacked(_mapKey, _innerPropKey)
      * If another complex data type (obj, list, map) is stored inside, we pass its _innerPropKey which is the same as
      * the propKey for the inner complex data type. We do this until we locate the final bool 
      * @param _value value to be stored
      */
    function setPropByKeyBool(string memory _KEY, string memory _list, uint _index, bytes memory _prop, bytes memory _propKey, bool _value) public 
    onlyNetworkContracts {
        etStorage.setBool(keccak256(abi.encodePacked(_KEY, _list, _index, _prop, _propKey)), _value);
    }

}