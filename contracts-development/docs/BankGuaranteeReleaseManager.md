# BANK GUARANTEE RELEASE MANAGER 

1. Publish a Bank Guarantee Release

    -   **Signature**
       `publishBankGuaranteeRelease(_bankGuaranteeRelease)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankGuaranteeRelease` | [*BankGuaranteeRelease*](#type-bankguaranteerelease)    | Bank Guarantee Release |
      - **Requirements**
        - caller must be registered e-GP account
        - bank guarantee UID exists
        - `amountReleased` is lesser than or equal to balance of bank guarantee
        - `releaseDate` is lesser than or equal to claim expiry date of bank guarantee
    - **Events**
        -   `BankGuaranteeReleased(_uid, bankGuaranteeUid, paymentReference, procuringEntityGid, egpSystemId vendorGid, bankGid, releaseDate, amountReleased, bgReleaseFileHash);`
        
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_uid`        | bytes8   | unique id of published `_bankGuaranteeRelease` |
        | `bankGuaranteeUid`        | bytes8   | unique id of bank gaurantee |
        | `paymentReference`  | String   | payment Reference            |
        | `procuringEntityGid`       | String   | Gid of procuring entity              |
        | `egpSystemId`        | String   |  Name of the e-GP system registered with the network |
        | `vendorGid`        | String   | GID of the vendor, as registered with the network |
        | `bankGid`        | String   | Gid of registered Bank |
        | `releaseDate`        | uint   | release date |
        | `amountReleased`        | uint   | amount Released |
        | `bgReleaseFileHash`        | String   | Hash of bank guarantee Release File |



2. Publish a Bank Guarantee Invoke

    -   **Signature**
       `publishBankGuaranteeInvoke(_bankGuaranteeInvoke)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankGuaranteeInvoke` | [*BankGuaranteeInvoke*](#type-bankguaranteeinvoke)    | Bank Guarantee Invoke  |
      - **Requirements**
        - caller must be registered e-GP account
        - bank guarantee UID exists
        - `revocationAmount` is lesser than or equal to balance of bank guarantee
        - `revocationDate` is lesser than or equal to claim expiry date of bank guarantee
    - **Events**
        -   `BankGuaranteeInvoked(_uid, bankGuaranteeUid, paymentReference, procuringEntityGid, egpSystemId, vendorGid, bankGid, revocationAmount, beneficiaryName, bgInvokeFileHash)`
        
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_uid`        | bytes8   | unique id of published `_bankGuaranteeInvoke` |
        | `bankGuaranteeUid`        | bytes8   | unique id of bank gaurantee |
        | `paymentReference`  | String   | payment Reference            |
        | `procuringEntityGid`       | String   | Gid of procuring entity              |
        | `egpSystemId`        | String   |  Name of the e-GP system registered with the network |
        | `vendorGid`        | String   | GID of the vendor, as registered with the network |
        | `bankGid`        | String   | Gid of registered Bank |
        | `revocationAmount`        | uint   | revocation amount |
        | `beneficiaryName`        | string   | name of beneficiary |
        | `bgInvokeFileHash`        | String   | Hash of bank guarantee Invoke File |


3. Get balance of a Bank Guarantee

    -   **Signature**
       `getBankGuaranteeBalance(_bgUid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
          | `_bgUid`        | bytes8   | unique id of bank gaurantee |
      - **Requirements**
        - Total Release till date less than BG Amount
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        |  | uint    | Bank Guarantee Balance |

4.  Get a Bank Guarantee Release By its Uid

    -   **Signature**
       `getBankGuaranteeRelease(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | unique id of published Bank Guarantee Release |
    -   **Requirements**
	    - `_uid` exists
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankGuaranteeRelease` | [*BankGuaranteeRelease*](#type-bankguaranteerelease)    | Bank Guarantee Release |

5.  Check if a Bank Guarantee Release Uid exists

    -   **Signature**
       `isReleaseUidExists(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | unique id of published Bank Guarantee Release |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `-` | bool   | `true` if exists, else `false` |

6.  Get Bank Guarantee Releases of a Bank Guarantee
	-   **Signature**
       `getBgReleaseListByBgUid(_bgUid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
          | `_bgUid`        | bytes8   | unique id of bank gaurantee |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `bgReleaseList_` | [*BankGuaranteeRelease*](#type-bankguaranteerelease)  []  | List of Bank Guarantee Releases |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

7.  Get Bank Guarantee Invokes of a Bank Guarantee
	-   **Signature**
       `getBgInvokeListByBgUid(_bgUid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
          | `_bgUid`        | bytes8   | unique id of bank gaurantee |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `bgReleaseList_` | [*BankGuaranteeInvoke*](#type-bankguaranteeinvoke)  []  | List of Bank Guarantee Invokes |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

8.  Get a Bank Guarantee Invoke By its Uid

    -   **Signature**
       `getBankGuaranteeInvoke(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | unique id of published Bank Guarantee Invoke |
    -   **Requirements**
	    - `_uid` exists
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankGuaranteeInvoke` | [*BankGuaranteeInvoke*](#type-bankguaranteeinvoke)    | Bank Guarantee Invoke |

9.  Check if a Bank Guarantee Invoke Uid exists

    -   **Signature**
       `isInvokeUidExists(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | unique id of published Bank Guarantee Invoke |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `-` | bool   | `true` if exists, else `false` |

   
10. #### TYPE: ***BankGuaranteeRelease*** 
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_uid`        | bytes8   | unique id of Bank Guarantee Release |
        | `bankGuaranteeUid`        | bytes8   | unique id of bank gaurantee |
        | `paymentReference`  | String   | payment Reference            |
        | `procuringEntityGid`       | String   | Gid of procuring entity              |
        | `egpSystemId`        | String   |  Name of the e-GP system registered with the network |
        | `vendorGid`        | String   | GID of the vendor, as registered with the network |
        | `bankGid`        | String   | Gid of registered Bank |
        | `branchName`        | String   | branch name |
        | `releaseDate`        | uint   | release date |
        | `amountReleased`        | uint   | amount Released |
        | `bgReleaseFileHash`        | String   | Hash of bank guarantee Release File |
        | `version` | uint16  | version of contract |


11. #### TYPE: ***BankGuaranteeInvoke*** 
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_uid`        | bytes8   | unique id of Bank Guarantee Invoke |
        | `bankGuaranteeUid`        | bytes8   | unique id of bank gaurantee |
        | `paymentReference`  | String   | payment Reference            |
        | `procuringEntityGid`       | String   | Gid of procuring entity              |
        | `egpSystemId`        | String   |  Name of the e-GP system registered with the network |
        | `vendorGid`        | String   | GID of the vendor, as registered with the network |
        | `bankGid`        | String   | Gid of registered Bank |
        | `branchName`        | String   | branch name |
        | `revocationDate`        | uint   | revocation date |
        | `revocationAmount`        | uint   | revocation amount |
        | `beneficiaryName`        | string   | name of beneficiary |
        | `beneficiaryBankAccountNumber`        | string   | bank account number of beneficiary |
        | `beneficiaryBankName`        | string   | bank name of beneficiary |
        | `beneficiaryBranchName`        | string   | branch name of beneficiary |
        | `beneficiaryIfscCode`        | string   | IFSC code of beneficiary |
        | `bgInvokeFileHash`        | String   | Hash of bank guarantee Invoke File |
        | `version` | uint16  | version of contract |
