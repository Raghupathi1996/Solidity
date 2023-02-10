


# WorkExperienceManager
1.  Add a new Work Experience

    -   **Signature**
       `addWorkExperience(_workEx)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_workEx` | [*WorkExperience*](#struct-workexperience)    | Work Experience details |
      - **Requirements**
	    - Award Of Contract's Uid exists
	    - Sender must be network admin or an account registered with the e-GP system id for the provided Procuring Entity GID
        - Procuring Entity GID matches with the Procuring Entity GID associated with the Award of Contract
    - **Events**
        -   `WorkExperienceAdded`
        
            | **Field** | **Type**                                         | **Description**                                                                                 |
            |---------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
            | `uid` | bytes8 | unique id |
            | `awardReference` | string | award Reference |
            | `workExperienceCertificateIssuanceDate` | string | Work experience certificate issuance date |
            | `contractCompletedValue` | string | Value of the contract completed |
            | `workExperienceFileHash` | string | Hash of Work Experience File |
            | `procuringEntityGid` | string | GID of the Procuring Entity |
            | `procuringEntityName` | string | Name of Procuring Entity Representative |
            | `procuringEntityRepresentativeName` | string | Designation of Procuring Entity Representative |
            | `procuringEntityRepresentativeDesignation` | string | Designation of Procuring Entity Representative |
            | `awardOfContractId` | bytes8  | Unique Id of Award of Contract |


2.  Get Work Experience using its Uid

    -   **Signature**
       `getWorkExperience(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid`        | bytes8   | Unique Id of Work Experience |
      - **Requirements**
	    - Uid exists
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     workExperience    |  [*WorkExperience*](#struct-workexperience)      | work experience details |

3.  Get Work Experiences of a Award of Contract

    -   **Signature**
       `getWorkExperiencesForAwardOfContract(_aocId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_aocId`        | bytes8   | Unique Id of the Award Of Contract |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
      - **Requirements**
	    - Award Of Contract's Uid exists
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    |     workExperiences    |  [*WorkExperience*](#struct-workexperience)  []    | List of Work Experiences for the given Award Of Contract |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

4.  Check if a Work Experience (using its Uid) exists
	-   **Signature**
       `isUidExists(_uid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_uid` | bytes8  | unique id value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_uid`  exists<br> else false |
   
5. #### Struct: ***WorkExperience*** 
| **Field** | **Type** | **Description**          |
|---------------|----------|--------------------------|
| `uid` | bytes8 | unique id |
| `awardReference` | string | award Reference |
| `workExperienceCertificateIssuanceDate` | string | Work experience certificate issuance date |
| `contractCompletedValue` | string | Value of the contract completed |
| `workStatus` |  [*WorkStatus*](#enum-workstatus) | Status of Work |
| `remarks` | string | contains any manually inputted text |
| `supplierRating` | [*SupplierRating*](#enum-supplierrating)  | supplier rating |
| `workExperienceFileHash` | string | hash of associated Work experience file |
| `procuringEntityGid` | string | GID assigned to Procuring Entity |
| `procuringEntityName` | string | Name of Procuring Entity |
| `procuringEntityRepresentativeName` | string | Name of Procuring Entity Representative |
| `procuringEntityRepresentativeDesignation` | string | Designation of Procuring Entity Representative |
| `awardOfContractId` | bytes8 | Unique id of associated Award of Contract |
| `version` | uint16  | version of contract |

6. #### Enum: ***WorkStatus*** 
- UNASSIGNED
- ONGOING
- COMPLETED
- CANCELLED
- SUSPENDED

7. #### Enum: ***SupplierRating*** 
- UNASSIGNED
- ONE
- TWO
- THREE
- FOUR
- FIVE
