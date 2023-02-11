


# AwardOfContractManager
1.  publish new Award Of Contract

    -   **Signature**
       `publishAwardOfContract(_aoc)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_aoc` | [*AOC*](#struct-aoc)    | award of contract details |
      - **Requirements**
        - account should exist and belong to passed orgId
	    - Vendor's Gid exists and is active
	    - Procuring Entity's Gid exists
    - **Events**
        -   `AwardOfContractPublished`
	         | **Field** | **Type** | **Description**          |
	         |---------------|----------|--------------------------|
	         | `uid` | bytes8  | unique id of newly published Award Of Contract  |
             | `vendorGid` | string  | Global id of the Vendor |
             | `procuringEntityGid` | string | Global id of Procuring Entity awarding the contract |
             | `awardReference` | string | award Reference |
             | `tenderReference` | string  | Tender reference |
	     

2.  Get Award Of Contract using its Uid

    -   **Signature**
       `getAwardOfContract(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | Unique Id of Award Of Contract |
      - **Requirements**
	    - Uid exists
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     `awardOfContract_`    |  [*AOC*](#struct-aoc)      | Award Of Contract details |
	    

3.  Get Award of Contracts awarded to a Vendor

    -   **Signature**
       `getAwardOfContractsForVendor(_gid, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid`   | string   | Gid of Vendor |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `awardOfContracts_` | [*AOC*](#struct-aoc) []   | award of contract details |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  ` length_`      | uint256   | total length of list |
	    

4.  Get Award of Contracts by Award Reference and Org Id

    -   **Signature**
       `getAocByAwardRefOrgId(_awardReference, _orgId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_awardReference`   | string   | Award Reference |
         | `_orgId`            | string   | Org Id of the e-GP system |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |  `awardOfContracts_` | [*AOC*](#struct-aoc) []   | award of contract details |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  ` length_`      | uint256   | total length of list |
	    

5. Check if a Award Of Contract (using its Uid) exists
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
	 
	 
5. Check if Procuring Entity GID matches with Award Of Contract (using its Uid)
	-   **Signature**
       `isProcuringEntityGidForAocUid(bytes8 _uid, string _procuringEntityGid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`       | bytes8  | unique id value to check for |
         | `_procuringEntityGid` | string  | GID of Procuring Entity |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_procuringEntityGid`  exists in AOC with `_uid`<br> else false |
	 
   
7. #### Struct: ***AOC*** 
| **Field** | **Type** | **Description** |
|---------------|----------------------------------------|---------|
| `uid` | bytes8  | unique id |
| `vendorGid` | string  | Global id of the Vendor |
| `vendorName` | string | Name of the vendor as registered in the e-GP system |
| `tenderReference` | string  | Tender reference |
| `awardReference` | string | award Reference |
| `title` | string  | tender Title |
| `contractAwardValue` | string | Contract award value at the tender level |
| `lotName` | string [] | name of lot, if contract award value is at the lot level |
| `awardOfContractDate` | string  | Award of Contract date |
| `procuringEntityGid` | string | Global id of Procuring Entity awarding the contract |
| `procuringEntityName` | string  | Name of Procuring Entity awarding the contract |
| `remarks` | string | contains any manually inputted text |
| `awardOfContractLink` | string  | Direct web-link where a award of contract related file uploaded in the e-GP system can be obtained |
| `orgId` | string | Organization Id |
| `version` | uint16  | version of contract |
