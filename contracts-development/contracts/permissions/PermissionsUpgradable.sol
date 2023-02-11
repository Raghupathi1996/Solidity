pragma solidity ^0.5.3;

import "./PermissionsInterface.sol";
import "./EternalStorage.sol";
import "./ContractRegistry.sol";

/** @title Permissions Upgradable Contract
  * @notice This contract holds the address of current permissions implementation
    contract. The contract is owned by a guardian account. Only the
    guardian account can change the implementation contract address as
    business needs.
  */
contract PermissionsUpgradable {

    address private guardian;
    address private permImpl;
    address private permInterface;
    address private etStorage;
    address private contractRegistry;
    // initDone ensures that init can be called only once
    bool private initDone;
    bool private dbInitiated;

    event InterfaceUpdated(address interfaceAddress_);
    event ImplementationUpdated(address implementationAddress_);

    /** @notice constructor
      */
    constructor () public{
        guardian = msg.sender;
        initDone = false;
    }

    /** @notice confirms that the caller is the guardian account
    */
    modifier onlyGuardian {
        require(msg.sender == guardian, "invalid caller");
        _;
    }

    /** @notice Registers a contract in storage and proxy contract
      * @param _contractAddress Address of contract whose access needs to be updated
      * @param _contractName Name of the contract in Capital Snake Case
      */
    function registerContract (string calldata _contractName, address _contractAddress) external 
    onlyGuardian {
      EternalStorage(etStorage).registerAddress(_contractAddress);
      ContractRegistry(contractRegistry).registerContract(_contractName, _contractAddress);
    }

    /** @notice UnRegisters a contract in storage and proxy contract
      * @param _contractAddress Address of contract whose access needs to be updated
      * @param _contractName Name of the contract in Capital Snake Case
      */
    function unRegisterContract (string calldata _contractName, address _contractAddress) external 
    onlyGuardian {
      ContractRegistry(contractRegistry).unregisterContract(_contractName);
      EternalStorage(etStorage).unregisterAddress(_contractAddress);
    }

    /** @notice Registers an account for storage access
      * @param _account Address of account whose access needs to be updated
      */
    function registerAccount (address _account) external 
    onlyGuardian {
      EternalStorage(etStorage).registerAddress(_account);
    }

    /** @notice UnRegisters an account for storage access
      * @param _account Address of account whose access needs to be updated
      */
    function unRegisterAccount (address _account) external 
    onlyGuardian {
      EternalStorage(etStorage).unregisterAddress(_account);
    }

    /** @notice Registers another storage contract in case of unfortunate upgrade
      * This new contract will be able to fetch all the keys from the current storage
      * @param _proposedStorage Address of the new storage account
      */
    function registerSecondaryStorage(address _proposedStorage) external 
    onlyGuardian {
      EternalStorage(etStorage).registerSecondaryStorage(_proposedStorage);
    }

    /** @notice executed by guardian. Links interface and implementation contract
        addresses. Can be executed by guardian account only
      * @param _permInterface permissions interface contract address
      * @param _permImpl implementation contract address
      * @param _etStorage eternal storage contract address
      * @param _contractRegistry contract registry contract address
      */
    function init(address _permInterface, address _permImpl, address _etStorage, address _contractRegistry) external
    onlyGuardian {
        require(!initDone, "can be executed only once");
        permImpl = _permImpl;
        permInterface = _permInterface;
        etStorage = _etStorage;
        contractRegistry = _contractRegistry;
        _setImpl(permImpl);
        initDone = true;
    }

    /** @notice changes the implementation contract address to the new address
        address passed. Can be executed by guardian account only
      * @param _proposedImpl address of the new permissions implementation contract
      */
    function confirmImplChange(address _proposedImpl) public
    onlyGuardian {
        // The policy details needs to be carried forward from existing
        // implementation to new. So first these are read from existing
        // implementation and then updated in new implementation
        (string memory adminOrg, string memory adminRole, string memory orgAdminRole, bool bootStatus) = PermissionsImplementation(permImpl).getPolicyDetails();
        _setPolicy(_proposedImpl, adminOrg, adminRole, orgAdminRole, bootStatus);
        permImpl = _proposedImpl;
        _setImpl(permImpl);
        emit ImplementationUpdated(_proposedImpl);
    }

    /** @notice changes the interface contract address to the new address
        address passed. Can be executed by guardian account only
      * @param _proposedInterface address of the new permissions interface contract
      */
    function changeInterface(address _proposedInterface) public 
    onlyGuardian {
      permInterface = _proposedInterface;
        _setImpl(permImpl);
      emit InterfaceUpdated(_proposedInterface);
    }

    /** @notice changes the proxy contract address to the new address.
        Can be executed by guardian account only
      * @param _proposedRegistry address of the new contract registry contract
      */
    function changeContractRegistry(address _proposedRegistry) public 
    onlyGuardian {
      contractRegistry = _proposedRegistry;
    }

    /** @notice changes the upgradable contract address in storage contract.
        Can be executed by guardian account only
      * @param _proposedUpgradable address for the existing storage contract
      * @dev this function should be prevented from being executed accidentally, 
      * as this could stop future updates
      */
    function changeUpgradable(address _proposedUpgradable) public 
    onlyGuardian {
      EternalStorage(etStorage).changePermUpgradable(_proposedUpgradable);
    }

    /** @notice function to fetch the guardian account address
      * @return _guardian guardian account address
      */
    function getGuardian() public view returns (address) {
        return guardian;
    }

    /** @notice function to fetch the current implementation address
      * @return permissions implementation contract address
      */
    function getPermImpl() public view returns (address) {
        return permImpl;
    }

    /** @notice function to fetch the interface address
      * @return permissions interface contract address
      */
    function getPermInterface() public view returns (address) {
        return permInterface;
    }
    
    /** @notice function to fetch the eternal storage address
      * @return eternal storage contract address
      */
    function getEternalStorage() public view returns (address) {
      return etStorage;
    }

    /** @notice function to fetch the contract registry address
      * @return contract registry contract address
      */
    function getContractRegistry() public view returns (address) {
      return contractRegistry;
    }

    /** @notice function to set the permissions policy details in the
        permissions implementation contract
      * @param _permImpl permissions implementation contract address
      * @param _adminOrg name of admin organization
      * @param _adminRole name of the admin role
      * @param _orgAdminRole name of default organization admin role
      * @param _bootStatus network boot status
      */
    function _setPolicy(address _permImpl, string memory _adminOrg, string memory _adminRole, string memory _orgAdminRole, bool _bootStatus) private {
        PermissionsImplementation(_permImpl).setMigrationPolicy(_adminOrg, _adminRole, _orgAdminRole, _bootStatus);
    }

    /** @notice function to set the permissions implementation contract address
        in the permissions interface contract
      * @param _permImpl permissions implementation contract address
      */
    function _setImpl(address _permImpl) private {
        PermissionsInterface(permInterface).setPermImplementation(_permImpl);
    }

}
