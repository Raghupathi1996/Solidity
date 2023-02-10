

# BankManager
1.  Register a Bank

    -   **Signature**
       `registerBank(_bankName, _bankCountry, _representativeAccountName)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankName` | String   | Name of the Bank |
        | `_bankCountry`  | String   | Country of the Bank |
        | `_representativeAccountName`  | String   | Bank Representative's registered Account Name  |
      - **Requirements**
	    - Bank Representative Account already registered with BANKS suborg
	    - Transacting Account is the network-admin
    - **Events**
        -   `BankRegistered(_gid, _bankName, _bankCountry, _representativeAccountName)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid`        | String   | global id of the Bank |
            | `_bankName`        | String   | Name of the Bank |
            | `_bankCountry`  | String   | Country of the Bank             |
            | `_representativeAccountName`       | String   | blockchain username of Bank Representative              |

2.  Get a Bank By its Gid

    -   **Signature**
       `getBankForGid(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid`        | String   | Gid of registered Bank |
    -   **Requirements**
	    - `_gid` exists
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `bank_` | [*Bank*](#type-bank)    | Bank Details |

3.  Get All Banks
	-   **Signature**
       `getAllBanks(_toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | bankList | [*Bank*](#type-bank)  []  | List of all Banks Registered |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

4. Check if a Gid exists
	-   **Signature**
       `isGidExists(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | _gid | String  | Gid value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_gid`  exists<br> else false |
   
5. #### TYPE: ***Bank*** 
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_gid`        | String   | Gid of registered Bank |
        | `_bankName` | String   | Name of the Bank |
        | `_bankCountry`  | String   | Country of the Bank |
        | `_representativeAccountName`  | String   | Bank Representative's registered Account Name  |
