# ProcuringEntityManager
1.  Add a new procuring entity

    -   **Signature**: 
       `registerProcuringEntity(_name, _externalId, _orgId)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_name`        | string   | Name of procuring entity |
        | `_externalId`  | string   | External Id              |
        | `_orgId`       | string   | Organization Id |
      - **Requirements**
        - account should exist and belong to passed orgId
    - **Events**
        -   `procuringEntityRegistered`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid`        | string   | Gid of procuring entity |
            | `_name`        | string   | Name of procuring entity |
            | `_externalId`  | string   | External Id              |
            | `_orgId`       | string   | Organization Id           |
            | `_version`       | uint16   | version of [*ProcuringEntity*](#struct-procuringentity) structure           |

2.  Get a Procuring entity using its Gid

    -   **Signature**: 
       `getProcuringEntityByGid(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid`        | string   | Gid of procuring entity |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `gid`        | string   | Gid of procuring entity |
        | `name`        | string   | Name of procuring entity |
        | `externalId`  | string   | External Id              |
        | `orgId`       | string   | Organization Id           |
        | `version` | uint16  | version of [*ProcuringEntity*](#struct-procuringentity) structure |

3.  Get all Procuring entities

    -   **Signature**: 
       `getAllProcuringEntities(_toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `procuringEntities_` | [*ProcuringEntity*](#struct-procuringentity) []  | list of all procuring entities |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_`   | uint256   | Total length of list |

4.  Get all Procuring entities for e-GP System Org Id

    -   **Signature**: 
       `getProcuringEntitiesForOrgId(_orgId, _toExcluded, _count)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_orgId`       | string   | e-GP System Org Id |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `procuringEntities_` | [*ProcuringEntity*](#struct-procuringentity) []  | list of all procuring entities belonging to `_orgId`|
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |

5.  Get Procuring entity's e-GP System Org Id by its GID

    -   **Signature**: 
       `getProcuringEntityOrgIdByGid(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_gid`       | string   | Procuring Entity GID |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `orgId_`      | string  | e-GP System Org Id |

6.  Check if a Procuring Entity (using its Gid) exists
	-   **Signature**
       `isGidExists(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid`        | string | Gid of procuring entity |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_uid`  exists<br> else false |
7. #### Struct: ***ProcuringEntity*** 
| **Field** | **Type**                                         | **Description**                                                                                 |
|---------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `gid` | string | global id |
| `name` | string | name |
| `externalId` | string | external Id |
| `orgId` | string | Organization Id |
| `version` | uint16  | version of contract |
