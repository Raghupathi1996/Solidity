# QuireContracts
Used internally by QuireUpgradable.sol

## Description and Usage
- This contract holds logic for storing the addresses of existing contracts
- For example: If, `VENDOR_MANAGER` contract is stored at the address `0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`, then the mapping (`VENDOR_MANAGER => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) is stored by this contract.
- This is useful for fetching the latest address of a contract by other contracts that depend on it.
- This can also be used to version contracts. For example, we can store (`VENDOR_MANAGER__V_2 => 0xa69C1034722F569C44c0CC2E3911e330DF2CBa03`) which is the address of VENDOR_MANAGER contract version 2.

## Function Signatures
1.  Registers a contract by contract name

    -   **Signature**: 
       `registerContract(_contractName, _contractAddress)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_contractName`        | string   | Name of account contract to be registered|
        | `_contractAddress`  | address   | Address of account contract to be registered           |
      - **Requirements**
        - No existing contract registered with `_contractName`
        - Called internally by QuireUpgradable.sol
    - **Events**
        -   `ContractRegistered`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_contractName`        | string   |  Name of account contract been registered|
            | `_contractAddress`  | address   |  Address of account contract to be registered           |

2.  Unregisters a contract by contract name

    -   **Signature**: 
       `unregisterContract(_contractName)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_contractName`        | string   |Name of account contract to be unregistered|
      - **Requirements**
        - There should be a contract registered with `_contractName`
        - Called internally by QuireUpgradable.sol
    - **Events**
        -   `ContractUnRegistered`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_contractName`        | string   |  Name of account contract been unregistered|

1.  Gets address of a registered contract by its name

    -   **Signature**: 
       `getRegisteredContract(_contractName)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_contractName`        | string   | Name of account contract|
      - **Requirements**
        - Existing contract registered with `_contractName`
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    |  address      | Address of account associated with `_contractName`   |
