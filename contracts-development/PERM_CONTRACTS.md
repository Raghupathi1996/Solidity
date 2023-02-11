# Permission Contracts

Permissions Contracts include following set of Contracts:
1. EternalStorage.sol
2. PermissionsUpgradable.sol
3. PermissionsInterface.sol and PermissionsImplementation.sol
4. ContractRegistry.sol
5. Storage Helper Contracts
6. Model Contracts
7. Manager Contracts

We explain each of these in detail below. 

The first 4 contracts are permanent, i.e. they should not be re-deployed while the last 3 are upgradable contracts, i.e. they can be re-deployed with updates/changes. 
From here we will refer the contracts in the first 4 points as `permanent contracts` while the remaining as `upgradable contracts`.

## PermissionsUpgradable.sol (Permanent Contract)
- This is the first permissions contract that is deployed to the network. This contract holds the addresses of the Guardian account,  EternalStorage.sol and ContractRegistry.sol, PermissionsInterface.sol and PermissionsImplementation.sol. The guardian account is the super admin account which deploys this contract. This address is stored in the contract during the contract deployment, i.e. in the constructor of the contract. There are additional functions in this contract that can store and change the addresses stored in the contract. These methods are explained below.
1. PermissionsUpgradable::`init(address _permInterface, address _permImpl, address _etStorage, address _contractRegistry)` This method can be called only once. It is called after deploying all permissions contracts. The addresses of these deployed contracts are passed as arguments to this function, and are stored in the contract's state after the function is executed. This function can be called by the guardian account only.
2. PermissionsUpgradable::`changeContractRegistry(address _proposedRegistry)`. This function updates the address of the ContractRegistry.sol contract. This function can be called by the guardian account only. This function should be called only when the ContractRegistry.sol contract has been updated, tested and deployed during a possible future update.
3. PermissionsUpgradable::`changeUpgradable(address _proposedUpgradable)`. The EternalStorage.sol contract contains the address of the PermissionsUpgradable.sol contract. We can consider the EternalStorage.sol to be the data and PermissionsUpgradable.sol (along with all other contracts except EternalStorage.sol) to be the logic. We allow editing the PermissionsUpgradable.sol contract and then deploying it and updating the address of the PermissionsUpgradable.sol contract in the EternalStorage.sol contract, i.e. updating the logic contracts with the same data contract (EternalStorage.sol). This function also can be called by the guardian account only. However we need to make sure not to accidentally call this method with arbitrary `_proposedUpgradable` address. The correct way to upgrade upgradable and/or storage contracts is described in the section below on [Updating Permanent Contracts](#updating-permanent-contracts).

- Note that the contract stores these addresses in the contract state itself. However for most other contracts, storage is delegated to the storage contract (EternalStorage.sol). This is not the case for the addresses stored by PermissionsUpgradable.sol

## EternalStorage.sol (Permanent Contract)
- This contract holds all the storage on behalf of other contracts. This is to make sure that other contracts that hold business logic can be updated without losing data. Hence we move the storage to a different contract, here EternalStorage.sol. We call this the `Upgradable Pattern`.
This contract can store all common data types including the following: 
1. Fixed size data types. These include `address`, `bool`, `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, `uint256`, `int8`, `int16`, `int32`, `int64`, `int128`, `int256`, `bytes1`, `bytes2`, `bytes4`, `bytes8`, `bytes16`, `bytes20`, `bytes32`
2. Dynamic size data types. These include `bytes` and `string`

- All these data types are stored in solidity mappings. There are different mappings for different data types. For example, the mapping for bool storage is declared in the contract as `mapping(bytes32 => bool) private boolStorage`
The keys for the mappings are always of type bytes32 and the values are of the respective type for each data type.
The contract also contains a constant string member named `KEY` with value `ALLOWED_CONTRACTS`. There are similar KEY in other contracts, like model contracts. The KEY is used for namespacing purpose and is passed as argument by the model contracts to the storage helper contracts and then the EternalStorage.sol contract. This key is hashed alongside other details to get the map key for the mappings. Values are stored against this bytes32 key. Depending on the type of the value, the mapping is chosen from above mentioned data types.

- There are no restrictions on READ, however WRITE is allowed only to addresses registered with this contract. The registration is done via PermissionsUpgradable.sol contract and is done by the network admin account.
When an account/contract address is registered for WRITE access by the network admin, the address is hashed along with the `KEY` (in EternalStorage.sol) mentioned above. The output which is bytes32 is used as key in bool storage and the value `true` is stored against the bytes32 map key. Whenever a contract writes to the storage, this value is verified and only then the WRITE is allowed.

- The storage contract is expected to remian unchanged. There is no function to update this in PermissionsUpgradable.sol. However we have a mechanism to get all values from the storage in case of unfortunate updates. This is explained in the section below on [Updating Permanent Contracts](#updating-permanent-contracts)

## ContractRegistry.sol (Permanent Contract)
- This contract holds logic for storing the addresses of existing contracts. Storage is done in EternalStorage.sol. The logic exists in this contract.
- For example: If, `ACCOUNT_MANAGER` contract is stored at the address `0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`, then the mapping (`ACCOUNT_MANAGER => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) is stored in EternalStorage.sol by this contract.
- This is useful for fetching the latest address of a contract by other contracts that depend on it.
- This can also be used to version contracts. For example, we can store (`ACCOUNT_MANAGER__V_2 => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) which is the address of ACCOUNT_MANAGER contract version 2.

## Storage Helper Contracts (Upgradable Contracts)
- These include 3 contracts which are as follows:
1. `MemberHelper.sol`. This contract holds logic for storing and reading member variables of different contracts. There are different functions for each data type that a member variable can have. For example, `setUint(string memory _KEY, string memory _member, uint _value)` stores `_value` (which is a uint) in mapping UintStorage of EternalStorage.sol. The bytes32 key against which this `_value` should be stored is created by hashing the `_KEY` and `_member` inputs from the caller contract. `_KEY` is the string constant namespace declared in the contract that calls this method, while `_member` is the name of the member variable from the same caller contract.

2. `MapHelper.sol`. This contract holds logic for storing and reading mapping type members in different contracts. There are different functions for each data type combination between the mapping key and mapping value. For example, `setBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, uint _value)` is a function in this contract that stores mapping of type `mapping(bytes8=>uint) idToIndex` in the EternalStorage contract on behalf of other contracts. `_KEY` is the constant string namespace which is declared in the caller contract, `_map` is the name of the mapping, here `idToIndex`, `_mapKey` is the mapping key which is of type bytes8 in this case, `_value` is the value being stored. If the value is a complex data type, like object or list, then we store each of the basic data in the complex data type against an additional argument that we provide to this function. It is described in more detail in the section on [complex types storage](#storing-complex-data-types)

3. `ListHelper.sol`. This contract holds logic for storing and reading list (of objects) type members in different contracts. We store the items in the list of objects against their index in the list and property name in the object. So, for example, `setPropBool(string memory _KEY, string memory _list, uint _index, string memory _prop, bool _value)` stores the bool `_value` at index `_index`, for object's property name `_prop`, for the list `_list`, for the contract with namespace `_KEY`. If the value is a complex data type, like object or list, then we store each of the basic data in the complex data type against an additional argument that we provide to this function. It is described in more detail in the section on [complex types storage](#storing-complex-data-types). 

- Each of these contracts is registered with ContractRegistry.sol (explained above). Hence they can be updated. They are registered against their name in UPPER_SNAKE_CASE. For example, deployed address of `MapHelper` is registered against name `MAP_HELPER`

## Model contracts (Upgradable Contracts)
- These include `AccountModel.sol`, `OrgModel.sol`, `NodeModel.sol`, `RoleModel.sol` and `VoterModel.sol`
- These contracts hold logic for interating with the storage helper contracts on behalf of their respective manager contracts. The WRITE methods of these contracts can be called by their respective manager contracts only. For example, `AccountModel::setAccountIndexByName(string memory _name, uint256 _index)` sets the value of `_index` against the key `_name` in the mapping accountIndexByName which is a mapping from string to uint256.
- These contracts are derived from their respective Structs contract. The structs contracts contain the struct type declaration. For example, `contract AccountModel is AccountStructs` is how we declare AccountModel contract in AccountModel.sol. The `contract AccountStructs` is also present in AccountModel.sol and contains the struct for AccountAccessDetails and AccountExternalDetails.
- Each of these contracts are registered with ContractRegistry.sol (explained above) against their names in UPPER_SNAKE_CASE. For example, the deployed address of `RoleModel.sol` is registered against `ROLE_MODEL` as contract name.

## Manager Contracts (Upgradable Contracts)
- These are the individual modules of the PermissionsImplementation contract whose methods are usually called by client application. They contain high level business logic, and interact with their respective model contract for storage.
- These include the following contracts: `AccountManager.sol`, `OrgManager.sol`, `NodeManager.sol`, `RoleManager.sol` and `VoterManager.sol`
- The READs for these contracts are open for all while the WRITES are only allowed via the PermissionImplementation contract.
- Each of these contracts are registered with ContractRegistry.sol (explained above) against their names in UPPER_SNAKE_CASE. For example, the deployed address of `AwardOfContractManager.sol` is registered against `AWARD_OF_CONTRACT_MANAGER` as contract name.

## PermissionsImplementation.sol (Permanent Contract)
- This is the master contract for the 5 manager contracts. It holds addresses of current implementation of the 5 manager contracts, hence links all these 5 contracts together.
- It receives calls from PermissionsInterface.sol and based on business logic, calls one or more of the 5 manager contracts. 
- It also stores a few member variables in the contract itself (not in EternalStorage.sol). These include the addresses of the 5 manager contracts, PermissionsUpgradable contract and network policy details which includes `adminOrg`, `adminRole`, `orgAdminRole`, `networkBoot`. Whenever the network or geth node restarts, the contract reads and sets these values internally from the `permission-config.js` file. Hence we have kept this values at the contract state itself.
- We can fetch/verify the network policy details by calling the function, `PermissionsImplementation::getPolicyDetails()`
- READS are open while writes are allowed only via PermissionsInterface.sol.

## PermissionsInterface.sol (Permanent Contract)
- This is the main contract that acts as an interaface between the Permissions Implementation and external clients. WRITEs to any of the Permissions Contracts must be called via functions in this contract. The WRITE calls are then delegated to the PermissionsImplementation contract. Hence this contract acts only as interface.
- It holds address of the PermissionsImplementation contract since most of the calls are forwarded there. 
- However the address of PermissionsImplementation stored in this contract can be updated by calling the function `PermissionsInterface::setPermImplementation(address _permImplementation)`. This method can only be called by the network admin via the PermissionsUpgradable contract. Hence this contract also holds the address of PermissionsUpgradable.sol for verifying this.

## Storing Complex Data Types
- Consider the function `setByKeyBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, bytes memory _propKey, uint _value)` from `MapHelper.sol`
- This is similar to `setBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, uint _value)`, except for the additional argument `bytes memory _propKey`
- From MapHelper.sol doc, we have: If one of the properties of a map item is a complex data type like list or map, we pass a `_propKey` along with the `_map`, `_mapKey`.
- `_propKey`: For object, it is `abi.encodePacked(_innerObjPropName, _innerPropKey)`. For example, if we have `mapping(bytes8 => StructA)`, where StructA is `StructA{string name; uint balance}`, then to fetch the `balance`, of the `StructA` object which is stored at map key `_mapKey`, we use the function `getByKeyBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, bytes memory _propKey)`, where `_propKey = abi.encodePacked(_innerObjPropName, _innerPropKey) = abi.encodePacked("balance")`. Ignore `_innerPropKey` for now, it will be explained below.
- For list, it is `abi.encodePacked(_index, _innerPropKey)`. For simple list, it is `abi.encodePacked(_index)`. For integer index, it fetches/stores the value at index `_index`. For length of the list, we use `abi.encodePacked("__length")`. For example, for mapping `mapping(bytes8 => uint[])`, the value of the map is `list of uint`, i.e. complex data type, hence to get the value at index `_index`, we pass `abi.encodePacked(_index)` as the `_propKey` parameter. For length of the list, we pass `abi.encodePacked("__length")`
- For map, it is `abi.encodePacked(_mapKey, _innerPropKey)`. This corresponds to `mapping(bytes8 => mapping(keyType => valueType))`. For example, if the mapping is `mapping(bytes8 => mapping(string => uint))`, then we need a function `setByKeyBytes8ToUint(...)`, and for `_propKey`, we pass `abi.encodePacked("inner mapping string key")`
- If another complex data type (obj, list, map) is stored inside, we pass its `_innerPropKey` in `_propKey = abi.encodePacked(_innerObjPropName, _innerPropKey)`, which is the same as the `_propKey` for the inner complex data type. We do this until we locate the final basic data type. For uint as the final data type `setByKeyBytes8ToUint(...)` is used, for string, `setByKeyBytes8ToString`, and so on.

## Upgrading Upgradable Contracts
- Updating any of the Model contract implies updating the respective Manager contract, since its address is stored in the respective manager contract.
- Updating any manager contract implies updating the PermissionsImplementation contract which means updating the `permissions-config.js` and calling `PermissionsInterface::setPermImplementation(address _permImplementation)` via the PermissionsUpgradable contract.
- `permission-config.js` contains addresses of Permissions contracts and the network policy details. Whenever any node is restarted, it must use the latest `permission-config.js` file. This file is updated whenever any permissions contract is changed.
- Hence we recommend to avoid updating the permissions contracts. However, if we do so, we should remember to use the latest `permission-config` whenever any node restarts.
- The steps to update the Permissions Contracts are provided in the document [UPGRADE_PERM](./UPGRADE_PERM.md)

## Updating Permanent Contracts
Following 3 permanent contracts under `quire-contracts/contracts/permissions` ideally should not be updated. But in case of unfortunate upgrade, we follow below mentioned steps:
- `ContractRegistry.sol`. We update the contract as per our needs. The new contract should contain following functions:
`function registerContract (string memory _contractName, address _contractAddress)`
`function unregisterContract (string memory _contractName)` 
(If we change the signature of these functions, we need to update PermissionsUpgradable.sol as well) 
Then we deploy the new contract, get the address where the contract is deployed, then call following method of PermissionsUpgradable.sol with the new address:
`PermissionsUpgradable::changeContractRegistry(address _proposedRegistry)`. This completes the update. We also redeploy all other contracts that import this contract. This includes the Model contracts. Since this contract stores no data on its own, we expect the data of registered contracts to persist after this update.

- `PermissionsUpgradable.sol`:
We update this contract or create the new PermissionsUpgradable contract. Then we init this contract with the existing addresses of PermissionsInterface.sol, PermissionsImplementation.sol, ContractRegistry.sol and EternalStorage.sol by calling `function init(address _permInterface, address _permImpl, address _etStorage, address _contractRegistry)`. At this point we have linked the existing PermissionsInterface.sol, PermissionsImplementation.sol, ContractRegistry and EternalStorage with the new PermissionsUpgradable contract, however we also need to update the EternalStorage.sol and ContractRegistry.sol with the new address of PermissionsUpgradable.sol contract. We first do this for EternalStorage contract and then for the ContractRegistry contract. We run `function changeUpgradable(address _proposedUpgradable)` from the older PermissionsUpgradable contract. This will update the address of PermissionsUpgradable in EternalStorage. **We must know that this step is not reversible and running this command with arbitrary address will lead to problems including stopping future updated or even loss of all data.** Once this step is done, we redeploy the ContractRegistry.sol contract by following the steps mentioned above. Then we redeploy all other contracts that are affected by these changes. This includes all other contracts including implementaion, interface, model and manager contracts.

- `EternalStorage.sol`: Ideally we should not update this contract. However in case of unfortunate update, we shall be able to transfer all data from this contract address to another address (another EternalStorage.sol address). Since storage is `mapping(key => value)` for different data types, we can completely migrate the storage, if we can fetch all the keys and then all the values.
To fetch keys for the storage, we can call `function getKeysListString(uint _from, uint _to)` from `EternalStorage.sol`. This can fetch all (in multiple paginated calls) the mapping keys for the StringStorage in EternalStorage.sol contract. There are similar methods to fetch keys for the other data types. Once we have the keys, we can fetch the values. We can then extract all the values and paste them in a storage contract in a new network or the same network. 
The functions to get the mapping keys can only be called by an address that has been registered for the same in `PermissionsUpgradable.sol`. We call the method `function registerSecondaryStorage(address _proposedStorage)` in PermissionsUpgradable to register the address. Ideally, we create the new `EternalStorage.sol` contract with added features (for example, adding new data type), deploy it, then register this newly deployed contract address as secondary storage for the old storage contract. For this we call the function `function registerSecondaryStorage(address _proposedStorage)` in `PermissionsUpgradable.sol` with the address of the new storage. In the new storage contract, we add methods that can fetch the keys and values from the old storage contract, since this contract is registered to do so. Since we cannot update the EternalStorage address in PermissionsUpgradable.sol, we deploy a new PermissionsUpgradable contract (and hence other contracts that are affected) and connect this new upgradable contract with the new EternalStorage contract. Once we have deployed all depended contracts, we can call the methods in the new EternalStorage contract to fetch all the key value pair data from the previous EternalStorage contract. Since, we need to update many other contracts to update the storage address, we should avoid this as much as possible.

**We can follow the steps above to update the 3 permanent contracts, `ContractRegistry`, `PermissionsUpgradable` and `EternalStorage`. However we should avoid doing this unless very important, since these contracts are ideally meant to be permanent and the steps to update them is prone to risk and failure.**

