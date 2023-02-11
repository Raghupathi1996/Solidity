


# PaymentAdviceManager
1.  Register new Payment Advice

    -   **Signature**
       `registerPaymentAdvice(_paymentAdvice)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_paymentAdvice` | [*PaymentAdvice*](#type-PaymentAdvice)    | Payment Advice Raw Details |
      - **Requirements**
	    - Transaction sender should be an account registered with the e-GP system provided in `_paymentAdvice` object 
	    - Procuring Entity GID Exists
	    - Vendor GID provided in the `_paymentAdvice` object should exist and should be active.
    - **Events**
        -   `PaymentAdviceRegistered(uid, egpSystemId, paymentAdviceReferenceNumber, validityPeriodDays, vendorGid, vendorName)`
	         | **Field** | **Type** | **Description**          |
	         |---------------|----------|--------------------------|
	         | _uid | bytes8  | unique id of newly published Payment Advice |
	         | _egpSystemId | string  | Name of the e-GP system registered with the network |
	         | _paymentAdviceReferenceNumber | string  | Payment Advice Reference Number |
	         | _validityPeriodDays | uint  | Validity Period in Days |
	         | _vendorGid | string  | GID of the vendor, as registered with the network |
	         | _vendorName | string  | Name of the vendor |
	         | _amendment | uint  | Amendment value |

2.  Get Payment Advice List by Payment Advice Reference and Egp System Id

    -   **Signature**
       `getPaymentAdviceListByPaymentAdviceRefAndEgpId(_paymentAdviceReferenceNumber, _egpSystemId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_paymentAdviceReferenceNumber`        | string   | Payment Advice Reference Number |
         | `_egpSystemId`        | string   | e-GP system Id, as registered with the network |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | [*PaymentAdvice*](#type-PaymentAdvice)    | Payment Advice details |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |


3.  Get Payment Advice Unique Ids List filtered by Payment Advice Ref and Egp System Id

    -   **Signature**
       `getPaymentAdviceUidsByPaymentAdviceRefAndEgpId(_paymentAdviceReferenceNumber, _egpSystemId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_paymentAdviceReferenceNumber` | string   | Payment Advice Reference Number, as registered with the network |
         | `_egpSystemId`        | string   | e-GP system Id, as registered with the network |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | bytes8 []     | List of Payment Advice Unique Ids |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |


4.  Get Payment Advice Unique Ids List filtered by Egp System Id

    -   **Signature**
       `getPaymentAdviceUidsByEgpId(_egpSystemId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_egpSystemId`        | string   | e-GP system Id, as registered with the network |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | bytes8 []     | List of Payment Advice Unique Ids |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |
       
5.  Get Payment Advice Unique Ids List filtered by Vendor GID

    -   **Signature**
       `getPaymentAdviceUidsByVendorGid(_vendorGid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_vendorGid`        | string   | Vendor GID, as registered with the network |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | bytes8 []     | List of Payment Advice Unique Ids |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

6.  Get Payment Advice Unique Ids List filtered by Procuring Entity GID

    -   **Signature**
       `getPaymentAdviceUidsByProcuringEntityGid(_peGid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_peGid`        | string   | Procuring Entity GID, as registered with the network |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | bytes8 []     | List of Payment Advice Unique Ids |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

7.  Get Payment Advice by Uid

    -   **Signature**
       `getPaymentAdvice(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | Unique Id of the Payment Advice |
      - **Requirements**
	    - Payment Advice should exist for the given Uid
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     -    | [*PaymentAdvice*](#type-PaymentAdvice)    | Payment Advice details |
      

8. Check if a Payment Advice (using its Uid) exists
	-   **Signature**
       `isUidExists(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | _uid | bytes8  | unique id value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_uid`  exists<br> else false |
   
9. #### TYPE: ***PaymentAdvice*** 
| **Field** | **Type** | **Description** |
|---------------|----------------------------------------|---------|
| `uid`      | bytes8  | Unique id of the Payment Advice |
| `egpSystemId` | string | Name of the e-GP system registered with the network |
| `paymentType` | uint  | 0 for OPEN, 1 for ENCRYPTED |
| `paymentAdviceReferenceNumber` | string | Payment Advice Reference Number |
| `validityPeriodDays` | uint  | Validity Period in Number of Days, defaults to 180 days |
| `bankGuaranteeClaimExpiryDate` | string | Bank Guarantee Claim Expiry Date |
| `bankGuaranteeAmount` | bytes32 | Bank Guarantee Amount Uint256 encoded to bytes32 |
| `vendorGid` | string  | GID of the vendor, as registered with the network |
| `vendorName` | string | Name of the vendor |
| `procuringEntityGid` | string  | GID of the procuring entity, as registered by the network |
| `procuringEntityName` | string | Name of the procuring entity |
| `amendment` | uint | amendment |
| `version` | string  | Version |
