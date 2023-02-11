# Quire Contracts

Quire Contracts include following set of Contracts:
1. QuireStorage.sol
2. QuireUpgradable.sol
3. QuireContracts.sol
4. Storage Helper Contracts
5. Model Contracts
6. Manager Contracts

We explain each of these in detail below. 

The first 3 contracts are permanent, i.e. they should not be re-deployed while the last 3 are upgradable contracts, i.e. they can be re-deployed with updates/changes. 
From here we will refer the 1st 3 contracts as `permanent contracts` while the remaining as `upgradable contracts`.

## QuireUpgradable.sol (Permanent Contract)
- This is the first quire contract that is deployed to the network. This contract holds the addresses of the Guardian account,  QuireStorage.sol and QuireContracts.sol. The guardian account is the super admin account which deploys this contract. This address is stored in the contract during the contract deployment, i.e. in the constructor of the contract. There are additional functions in this contract that can store and change the addresses stored in the contract. These methods are explained below.
1. QuireUpgradable::`init(address _quireContracts, address _quireStorage)` This method can be called only once. It is called after deploying the QuireStorage and QuireContracts contracts. The addresses of these deployed contracts are passed as arguments to this function, and are stored in the contract's state after the function is executed. This function can be called by the guardian account only.
2. QuireUpgradable::`changeProxyContract(address _proposedProxy)`. This function updates the address of the QuireContracts.sol contract. This function can be called by the guardian account only. This function should be called only when the QuireContracts.sol contract has been updated, tested and deployed during a possible future update.
3. QuireUpgradable::`changeUpgradable(address _proposedUpgradable)`. The QuireStorage.sol contract contains the address of the QuireUpgradable.sol contract. We can consider the QuireStorage.sol to be the data and QuireUpgradable.sol (along with all other contracts except QuireStorage.sol) to be the logic. We allow editing the QuireUpgradable.sol contract and then deploying it and updating the address of the QuireUpgradable.sol contract in the QuireStorage.sol contract, i.e. updating the logic contracts with the same data contract (QuireStorage.sol). This function also can be called by the guardian account only. However we need to make sure not to accidentally call this method with arbitrary `_proposedUpgradable` address. The correct way to upgrade upgradable and/or storage contracts is described in the section below on [Updating Permanent Contracts](#updating-permanent-contracts).

- Note that the contract stores these addresses in the contract state itself. However for most other contracts, storage is delegated to the storage contract (QuireStorage.sol). This is not the case for the addresses stored by QuireUpgradable.sol

## QuireStorage.sol (Permanent Contract)
- This contract holds all the storage on behalf of other contracts. This is to make sure that other contracts that hold business logic can be updated without losing data. Hence we move the storage to a different contract, here QuireStorage.sol. We call this the `Upgradable Pattern`.
This contract can store all common data types including the following: 
1. Fixed size data types. These include `address`, `bool`, `uint8`, `uint16`, `uint32`, `uint64`, `uint128`, `uint256`, `int8`, `int16`, `int32`, `int64`, `int128`, `int256`, `bytes1`, `bytes2`, `bytes4`, `bytes8`, `bytes16`, `bytes20`, `bytes32`
2. Dynamic size data types. These include `bytes` and `string`

- All these data types are stored in solidity mappings. There are different mappings for different data types. For example, the mapping for bool storage is declared in the contract as `mapping(bytes32 => bool) private boolStorage`
The keys for the mappings are always of type bytes32 and the values are of the respective type for each data type.
The contract also contains a constant string member named `KEY` with value `ALLOWED_CONTRACTS`. There are similar KEY in other contracts, like model contracts. The KEY is used for namespacing purpose and is passed as argument by the model contracts to the storage helper contracts and then the QuireStorage.sol contract. This key is hashed alongside other details to get the map key for the mappings. Values are stored against this bytes32 key. Depending on the type of the value, the mapping is chosen from above mentioned data types.

- There are no restrictions on READ, however WRITE is allowed only to addresses registered with this contract. The registration is done via QuireUpgradable.sol contract and is done by the network admin account.
When an account/contract address is registered for WRITE access by the network admin, the address is hashed along with the `KEY` (in QuireStorage.sol) mentioned above. The output which is bytes32 is used as key in bool storage and the value `true` is stored against the bytes32 map key. Whenever a contract writes to the storage, this value is verified and only then the WRITE is allowed.

- The storage contract is expected to remian unchanged. There is no function to update this in QuireUpgradable.sol. However we have a mechanism to get all values from the storage in case of unfortunate updates. This is explained in the section below on [Updating Permanent Contracts](#updating-permanent-contracts)

## QuireContracts.sol (Permanent Contract)
- This contract holds logic for storing the addresses of existing contracts. Storage is done in QuireStorage.sol. The logic exists in this contract.
- For example: If, `VENDOR_MANAGER` contract is stored at the address `0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`, then the mapping (`VENDOR_MANAGER => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) is stored in QuireStorage.sol by this contract.
- This is useful for fetching the latest address of a contract by other contracts that depend on it.
- This can also be used to version contracts. For example, we can store (`VENDOR_MANAGER__V_2 => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) which is the address of VENDOR_MANAGER contract version 2.

## Storage Helper Contracts (Upgradable Contracts)
- These include 3 contracts which are as follows:
1. `MemberStorage.sol`. This contract holds logic for storing and reading member variables of different contracts. There are different functions for each data type that a member variable can have. For example, `setUint(string memory _KEY, string memory _member, uint _value)` stores `_value` (which is a uint) in mapping UintStorage of QuireStorage.sol. The bytes32 key against which this `_value` should be stored is created by hashing the `_KEY` and `_member` inputs from the caller contract. `_KEY` is the string constant namespace declared in the contract that calls this method, while `_member` is the name of the member variable from the same caller contract.

2. `MapStorage.sol`. This contract holds logic for storing and reading mapping type members in different contracts. There are different functions for each data type combination between the mapping key and mapping value. For example, `setBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, uint _value)` is a function in this contract that stores mapping of type `mapping(bytes8=>uint) idToIndex` in the QuireStorage contract on behalf of other contracts. `_KEY` is the constant string namespace which is declared in the caller contract, `_map` is the name of the mapping, here `idToIndex`, `_mapKey` is the mapping key which is of type bytes8 in this case, `_value` is the value being stored. If the value is a complex data type, like object or list, then we store each of the basic data in the complex data type against an additional argument that we provide to this function. It is described in more detail in the section on [complex types storage](#storing-complex-data-types)

3. `ListStorage.sol`. This contract holds logic for storing and reading list (of objects) type members in different contracts. We store the items in the list of objects against their index in the list and property name in the object. So, for example, `setPropBool(string memory _KEY, string memory _list, uint _index, string memory _prop, bool _value)` stores the bool `_value` at index `_index`, for object's property name `_prop`, for the list `_list`, for the contract with namespace `_KEY`. If the value is a complex data type, like object or list, then we store each of the basic data in the complex data type against an additional argument that we provide to this function. It is described in more detail in the section on [complex types storage](#storing-complex-data-types). 

- Each of these contracts is registered with QuireContracts.sol (explained above). Hence they can be updated. They are registered against their name in UPPER_SNAKE_CASE. For example, deployed address of `MapStorage` is registered against name `MAP_HELPER`. Note that it is registered as `MAP_HELPER` and not as `MAP_STORAGE` (this is an exception only for storage helper contracts). Refer [Official Contract Names Here](./scripts/constants.js)
- To update these contracts, refer documentation on [UPGRADE_QUIRE](./UPGRADE_QUIRE.md)

## Model contracts (Upgradable Contracts)
- These include `ProcuringEntityModel.sol`, `VendorModel.sol`, `AwardOfContractModel.sol`, `WorkExperienceModel.sol`, `BankModel.sol`, `PaymentAdviceModel.sol`, `BankGuaranteeModel.sol` and `BankGuaranteeReleaseModel.sol`
- These contracts hold logic for interating with the storage helper contracts on behalf of their respective manager contracts. The WRITE methods of these contracts can be called by their respective manager contracts only. For example, `VendorModel::setGidParentGid(uint256 _index, string memory _parentGid)` sets the parent GID of a Gid Object which is at index `_index` in the gidList stored and fetched by VendorManager.sol
- These contracts are derived from their respective Structs contract. The structs contracts contain the struct type declaration. For example, `contract VendorModel is VendorStructs` is how we declare VendorModel contract in VendorModel.sol. The `contract VendorStructs` is also present in VendorModel.sol and contains the struct for Vendor, GidSeedRequest, etc data types.
- Each of these contracts are registered with QuireContracts.sol (explained above) against their names in UPPER_SNAKE_CASE. For example, the deployed address of `AwardOfContractModel.sol` is registered against `AWARD_OF_CONTRACT_MODEL` as contract name.
- To update these contracts, refer documentation on [UPGRADE_QUIRE](./UPGRADE_QUIRE.md)

## Manager Contracts (Upgradable Contracts)
- These are the contracts whose methods are usually called by client application. They contain high level business logic, and interact with their respective model contract for storage.
- These include the following contracts: `ProcuringEntityManager.sol`, `VendorManager.sol`, `AwardOfContractManager.sol`, `WorkExperienceManager.sol`, `BankManager.sol`, `PaymentAdviceManager.sol`, `BankGuaranteeManager.sol` and `BankGuaranteeReleaseManager.sol`
- Each of these contracts are registered with QuireContracts.sol (explained above) against their names in UPPER_SNAKE_CASE. For example, the deployed address of `AwardOfContractManager.sol` is registered against `AWARD_OF_CONTRACT_MANAGER` as contract name.
- To update these contracts, refer documentation on [UPGRADE_QUIRE](./UPGRADE_QUIRE.md)

## Storing Complex Data Types
- Consider the function `setByKeyBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, bytes memory _propKey, uint _value)` from `MapStorage.sol`
- This is similar to `setBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, uint _value)`, except for the additional argument `bytes memory _propKey`
- From MapStorage.sol doc, we have: If one of the properties of a map item is a complex data type like list or map, we pass a `_propKey` along with the `_map`, `_mapKey`.
- `_propKey`: For object, it is `abi.encodePacked(_innerObjPropName, _innerPropKey)`. For example, if we have `mapping(bytes8 => StructA)`, where StructA is `StructA{string name; uint balance}`, then to fetch the `balance`, of the `StructA` object which is stored at map key `_mapKey`, we use the function `getByKeyBytes8ToUint(string memory _KEY, string memory _map, bytes8 _mapKey, bytes memory _propKey)`, where `_propKey = abi.encodePacked(_innerObjPropName, _innerPropKey) = abi.encodePacked("balance")`. Ignore `_innerPropKey` for now, it will be explained below.
- For list, it is `abi.encodePacked(_index, _innerPropKey)`. For simple list, it is `abi.encodePacked(_index)`. For integer index, it fetches/stores the value at index `_index`. For length of the list, we use `abi.encodePacked("__length")`. For example, for mapping `mapping(bytes8 => uint[])`, the value of the map is `list of uint`, i.e. complex data type, hence to get the value at index `_index`, we pass `abi.encodePacked(_index)` as the `_propKey` parameter. For length of the list, we pass `abi.encodePacked("__length")`
- For map, it is `abi.encodePacked(_mapKey, _innerPropKey)`. This corresponds to `mapping(bytes8 => mapping(keyType => valueType))`. For example, if the mapping is `mapping(bytes8 => mapping(string => uint))`, then we need a function `setByKeyBytes8ToUint(...)`, and for `_propKey`, we pass `abi.encodePacked("inner mapping string key")`
- If another complex data type (obj, list, map) is stored inside, we pass its `_innerPropKey` in `_propKey = abi.encodePacked(_innerObjPropName, _innerPropKey)`, which is the same as the `_propKey` for the inner complex data type. We do this until we locate the final basic data type. For uint as the final data type `setByKeyBytes8ToUint(...)` is used, for string, `setByKeyBytes8ToString`, and so on.

## Updating Permanent Contracts
Following 3 permanent contracts under `quire-contracts/contracts/quire` ideally should not be updated. But in case of unfortunate upgrade, we follow below mentioned steps:
- `QuireContracts.sol`. We update the contract as per our needs. The new contract should contain following functions:
`function registerContract (string memory _contractName, address _contractAddress)`
`function unregisterContract (string memory _contractName)` 
(If we change the signature of these functions, we need to update QuireUpgradable.sol as well) 
Then we deploy the new contract, get the address where the contract is deployed, then call following method of QuireUpgradable.sol with the new address:
`QuireUpgradable::changeProxyContract(address _proposedProxy)`. This completes the update. We also redeploy all other contracts that import this contract. This includes the Model contracts. Since this contract stores no data on its own, we expect the data of registered contracts to persist after this update.

- `QuireUpgradable.sol`:
We update this contract or create the new QuireUpgradable contract. Then we init this contract with the existing addresses of QuireContracts.sol and QuireStorage.sol by calling `function init(address _quireContracts, address _quireStorage)`. At this point we have linked the existing QuireContracts and QuireStorage with the new QuireUpgradable contract, however we also need to update the QuireStorage.sol and QuireContracts.sol with the new address of QuireUpgradable.sol contract. We first do this for QuireStorage contract and then for the QuireContracts contract. We run `function changeUpgradable(address _proposedUpgradable)` from the older QuireUpgradable contract. This will update the address of QuireUpgradable in QuireStorage. **We must know that this step is not reversible and running this command with arbitrary address will lead to problems including stopping future updated or even loss of all data.** Once this step is done, we redeploy the QuireContracts.sol contract by following the steps mentioned above. Then we redeploy all other contracts that are affected by these changes. This includes, for example, the Model Contracts.

- `QuireStorage.sol`: Ideally we should not update this contract. However in case of unfortunate update, we shall be able to transfer all data from this contract address to another address (another QuireStorage.sol address). Since storage is `mapping(key => value)` for different data types, we can completely migrate the storage, if we can fetch all the keys and then all the values.
To fetch keys for the storage, we can call `function getKeysListString(uint _from, uint _to)` from `QuireStorage.sol`. This can fetch all (in multiple paginated calls) the mapping keys for the StringStorage in QuireStorage.sol contract. There are similar methods to fetch keys for the other data types. Once we have the keys, we can fetch the values. We can then extract all the values and paste them in a storage contract in a new network or the same network. 
The functions to get the mapping keys can only be called by an address that has been registered for the same in `QuireUpgradable.sol`. We call the method `function registerSecondaryStorage(address _proposedStorage)` in QuireUpgradable to register the address. Ideally, we create the new `QuireStorage.sol` contract with added features (for example, adding new data type), deploy it, then register this newly deployed contract address as secondary storage for the old storage contract. For this we call the function `function registerSecondaryStorage(address _proposedStorage)` in `QuireUpgradable.sol` with the address of the new storage. In the new storage contract, we add methods that can fetch the keys and values from the old storage contract, since this contract is registered to do so. Since we cannot update the QuireStorage address in QuireUpgradable.sol, we deploy a new QuireUpgradable contract (and hence other contracts that are affected) and connect this new upgradable contract with the new QuireStorage contract. Once we have deployed all depended contracts, we can call the methods in the new QuireStorage contract to fetch all the key value pair data from the previous QuireStorage contract. Since, we need to update many other contracts to update the storage address, we should avoid this as much as possible.

**We can follow the steps above to update the 3 permanent contracts, `QuireContracts`, `QuireUpgradable` and `QuireStorage`. However we should avoid doing this unless very important, since these contracts are ideally meant to be permanent and the steps to update them is prone to risk and failure.**

