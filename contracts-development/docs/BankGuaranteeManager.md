

# BANK GUARANTEE MANAGER 
1.  publish new Bank Guarantee

    -   **Signature**
       `publishBankGuarantee(_bankGuarantee)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_bankGuarantee  ` | [*BankGuarantee*](#struct-bankguarantee)    | Bank guarantee details  |
      - **Requirements**
        - Bank Gid exists 
	    - Caller should be corresponding Bank representative 
	    - Payment Advice exists 
	    - Bank GID exists
	    - Amendment should be 1 if BG exists for BankGID and PaymentAdviceUid, otherwise it should be 0
    - **Events**
        -   `BankGuaranteeRegistered`
	         | **Field** | **Type** | **Description**          |
	         |---------------|----------|--------------------------|
	         | `uid` | bytes8  | unique id of newly published Bank Guarantee   |
             | `_bankGid ` | string  | Global id of the Bank  |
             | `_paymentAdviceNumber ` | string | Payment advice number  |
             | `_referenceNumber ` | string | Reference number of published Bank Guarantee  |
             | `amendment ` | uint  | Should be set to 1 to update existing Bank Guarantee, else 0 for publishing new one.  |


2.  Get Bank Guarantees by Unique ID 

    -   **Signature**
       `getBankGuarantee(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid `        | bytes8   | Bank Guarantee UID   |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |    `bankGuarantee_`    |  [*BankGuarantee*](#struct-bankguarantee) | Bank Guarantee Object |
	    

3.  Get Bank Guarantees by Vendor 

    -   **Signature**
       `getBankGuaranteesByVendorGid(_vendorGid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_vendorGid `        | string   | Vendor GID   |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `bankGuarantees_`|  [*BankGuarantee*](#struct-bankguarantee)[] | List of Bank Guarantees |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`       | uint256   | total length of the list |
	    

4.  Get Bank Guarantees by Payment reference number and EGP ID 

    -   **Signature**
       `getBankGuaranteesByPaymentAdviceRefAndEgpId(_paymentAdviceReferenceNumber,_ egpSystemId)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_paymentAdviceReferenceNumber `        | string   | Payment reference number   |
         | `_egpSystemId `              | string   | egpSystemId   |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `bankGuarantees_`|  [*BankGuarantee*](#struct-bankguarantee)[] | List of Bank Guarantees |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`       | uint256   | total length of the list |
	    
        
5.  Get Bank Guarantees by Bank 

    -   **Signature**
       `getBankGuaranteesByBankGid(_bankGid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_bankGid `        | string   | bank GID   |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `bankGuarantees_`     |  [*BankGuarantee*](#struct-bankguarantee)[] | List of Bank Guarantees |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`       | uint256   | total length of the list |


6.  Get Bank Guarantees by e-GP System Id 

    -   **Signature**
       `getBankGuaranteesByEgpId(_egpId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_egpId `        | string   | e-GP System Id    |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `bankGuarantees_`|  [*BankGuarantee*](#struct-bankguarantee)[] | List of Bank Guarantees |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`       | uint256   | total length of the list |


7.  Get Bank Guarantees by Procuring Entity GID

    -   **Signature**
       `getBankGuaranteesByPeGid(_peGid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_peGid `        | string   | Procuring Entity GID   |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `bankGuarantees_`|  [*BankGuarantee*](#struct-bankguarantee)[] | List of Bank Guarantees |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`       | uint256   | total length of the list |

8. Check if a Uid exists
	-   **Signature**
       `isUidExists(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid` | bytes8  | Uid value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_uid`  exists<br> else false |   


9. Check if a Bank Guarantee exists for Payment Advice Uid
	-   **Signature**
       `isBgExistsForPaymentAdviceUid(_paymentAdviceUid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_paymentAdviceUid` | bytes8  | Payment Advice Uid value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if BankGuarantee exists<br> else false |


10. #### Struct: ***BankGuarantee*** 
| **Field** | **Type** | **Description** |
|---------------|----------------------------------------|---------|
| `uid` | bytes8  |Unique Id of bank Guarantee  |
| `bankGid` | string  | Global id of bank |
| `paymentAdviceNumber` | string | Global id of bank |
| `paymentAdviceUid` | bytes8  | Unique id of payment advice |
| `referenceNumber` | string | Reference number of bank Guarantee  |
| `branchName` | string  | Branch name  |
| `bankRepresentativeName` | bytes | Encoded Name of bank representative  |
| `issuanceDate` | bytes  | Encoded Date of issue |
| `validityPeriod` | bytes | Encoded Validity period  |
| `claimExpiryDate` | bytes  | Encoded Claim expiry date  |
| `validFrom` | bytes | Encoded valid from |
| `validTill` | bytes  | Encoded valid till |
| `amount` | bytes | Encoded amount |
| `beneficiaryName` | bytes  | Encoded beneficiary name |
| `fileHash` | string  | hash of file |
| `bankEncryptedKey` | string | Encrpyted key of bank   |
| `egpEncryptedKey` | string | Encrpyted key of egp  |
| `vendorEncryptedKey` | string | Encrpyted key of vendor  |
| `version` | uint16  | version of contract |
