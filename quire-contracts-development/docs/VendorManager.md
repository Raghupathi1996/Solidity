

# VendorManager
1.  Register a Vendor

    -   **Signature**
       `registerVendor(_vendorName, _externalId, _orgId, _accountName)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
        | `_vendorName` | string   | Name of the Vendor |
        | `_externalId`  | string   | External Id of the EGP |
        | `_orgId`       | string   | Organization Id of the EGP |
        | `_accountName`  | string   | Vendor's blockchain username  |
      - **Requirements**
	    - `_accountName` registered with VENDORS suborg
	    - Caller is the network-admin
        - Gid should not be already registered for given `_accountName`
    - **Events**
        -   `VendorRegistered(_gid, _accountName, _vendorEgpName, _vendorEgpId, _vendorEgpOrgId)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid`        | string   | global id of the Vendor |
            | `_accountName`        | string   | Vendor's blockchain username |
            | `_vendorEgpName`  | string   | Name of registered Vendor             |
            | `_vendorEgpId`       | string  |  External Id of the EGP     |
            | `_vendorEgpOrgId`       | string   | Organization Id of the EGP              |

2.  Get a Vendor using its Gid

    -   **Signature**
       `getVendorByGid(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid`        | string   | Gid of the registered Vendor |
    - **Requirements**
	    - `_gid` exists
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	       | `-`        | [*Vendor*](#struct-vendor)   | vendor details |    |

3.  Get the Gid of a registered Vendor

    -   **Signature**
       `getGidForVendor(_accountName)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_accountName`        | string   | Vendor's blockchain username |
    -   **Returns**
        | **Field**  | **Type** | **Description**          |
        |---------------|----------|--------------------------|
	    | `-`        | string   | global id of the registered Vendor |

4. Merging two Gids (*Gid1*, *Gid2*) of a Vendor involves three function calls
	- **STEP 1**: *Gid1* initialise a new Gid merge
		 - **Signature**
		       `initiateGidMerge(_gid1,_gid2)`
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid1`       | string   | Gid of the registered Vendor<br>must be owned by the caller |
	      | `_gid2`       | string   | Gid of the registered Vendor to be merged                            |
	   - **Requirements**
	      - `_gid1` exists and is owned by the caller
	      - `_gid2` exists
	      - Should be a new Merge Request for `(_gid1,_gid2)`, else earlier one must be Rejected (State is **REJECTED**)
      - **Effect**
	      - MergeRequest is created and in **INITIATED** state 
      - **Events**
        -   `MergeRequestInitiated(_gid1, _gid2)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid1`        | string   | global id of the first Vendor |
            | `_gid2`        | string   | global id of the second Vendor |
	      
	- **STEP 2**: *Gid2* submits its approval for initiated Gid merge

		 - **Signature**
		       `submitGidMerge(_gid1,_gid2,approval)`
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid1`       | string   | Gid of the registered Vendor |
	      | `_gid2`       | string   | Gid of the registered Vendor to be merged |
	      | `approval`       | bool   | set *True* to approve |
	   - **Requirements**
	      - `_gid1` exists
	      - `_gid2` exists and is owned by the caller
	      - Merge Request for `(_gid1,_gid2)` exists and already initiated (*step 1*)
      - **Effect**
	      - MergeRequest is moved from **INITIATED** to **SUBMITTED** state 
      - **Events**
        -   `MergeRequestSubmitted(_gid1, _gid2)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid1`        | string   | global id of the first Vendor |
            | `_gid2`        | string   | global id of the second Vendor |

	- **STEP 3a**: Network Admin approves the submitted Gid merge

		 - **Signature**
		       `approveGidMerge(_gid1,_gid2,approval)`
		       
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid1`       | string   | Gid of the registered Vendor |
	      | `_gid2`       | string   | Gid of the registered Vendor to be merged |
	      | `approval`       | bool   | set *True* to approve |
	      
	   - **Requirements**
	      - `_gid1` exists
	      - `_gid2` exists
	      - Merge Request for `(_gid1,_gid2)` exists and already submitted (*step 2*)
	      - Caller must be a network admin account
      - **Effect**
	      - MergeRequest is moved from **SUBMITTED** to **APPROVED** state 
      - **Events**
        -   `MergeRequestApproved(_gid1, _gid2)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid1`        | string   | global id of the first Vendor |
            | `_gid2`        | string   | global id of the second Vendor |

    - **STEP 3b**: Network Admin expires the submitted Gid merge

		 - **Signature**
		       `expireGidMerge(_gid1,_gid2,approval)`
		       
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid1`       | string   | Gid of the registered Vendor |
	      | `_gid2`       | string   | Gid of the registered Vendor to be merged |
	      
	   - **Requirements**
	      - `_gid1` exists
	      - `_gid2` exists
	      - Merge Request for `(_gid1,_gid2)` exists and active (either in **SUBMITTED** or **APPROVED** state}
	      - Caller must be a network admin account
      - **Effect**
	      - MergeRequest is moved to **EXPIRED** state 
      - **Events**
        -   `MergeRequestExpired(_gid1, _gid2)`
        
            | **Field**  | **Type** | **Description**          |
            |---------------|----------|--------------------------|
            | `_gid1`        | string   | global id of the first Vendor |
            | `_gid2`        | string   | global id of the second Vendor |

5. Get All Merge Requests 
	-   **Signature**
       `getAllMergeRequests(_toExcluded, _count)`
   - **Parameters**
      | **Parameter** | **Type** | **Description**                                     |
      | ---------------|----------|-----------------------------------------------------|
      | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
      | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | mergeRequestList | [*MergeRequest*](#struct-mergerequest)  []  | List of all Merge Requests ever made |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

6. Get All *Active* Merge Requests 
	-   **Signature**
       `getActiveMergeRequests(_toExcluded, _count)`
   - **Parameters**
      | **Parameter** | **Type** | **Description**                                     |
      | ---------------|----------|-----------------------------------------------------|
      | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
      | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | [*MergeRequest*](#struct-mergerequest) []  | List of all Merge Requests in **INITIATED** or **SUBMITTED** state |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |

7. Submitting seed request for a Gid of a Vendor involves two function calls
	      
	- **STEP 1**: submit a new seed Gid request

		 - **Signature**
		       `submitGidSeedRequest(_gid,_vendorEgpId,_vendorEgpOrgId)`
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |
	   - **Requirements**
	      - `_gid` exists, active and is owned by the caller
	      - Seed Request should not exist, or must be in **EXPIRED** or **REJECTED** states
      - **Effect**
	      - new Seed Request is created in **SUBMITTED** state
      - **Events**
        -   `SeedRequestSubmitted`

	      | **Field** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |

	- **STEP 2a**: Network Admin approves the submitted Gid Seed Request

		 - **Signature**
		       `approveGidSeedRequest(_gid,_vendorEgpId,_vendorEgpOrgId)`
		       
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |
	      
	   - **Requirements**
	      - `_gid` exists and active
	      - Seed Request exists and in **SUBMITTED** state  (*step 1*)
	      - Caller must be a network admin account
      - **Effect**
	      - Seed Request  is moved from **SUBMITTED** to **APPROVED** state 
      - **Events**
        -   `SeedRequestApproved`

	      | **Field** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |

    - **STEP 3b**: Network Admin expires the submitted Seed Request

		 - **Signature**
		       `expireGidSeedRequest(_gid,_vendorEgpId,_vendorEgpOrgId)`
		       
	   - **Parameters**
	      | **Parameter** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |

	   - **Requirements**
	      - Seed Request exists and in **SUBMITTED** state  (*step 1*)
	      - Caller must be a network admin account
      - **Effect**
	      - Seed Request is moved to **EXPIRED** state 
      - **Events**
        -   `SeedRequestExpired`

	      | **Field** | **Type** | **Description**                                     |
	      | ---------------|----------|-----------------------------------------------------|
	      | `_gid`       | string   | Gid of the registered Vendor |
	      | `_vendorEgpId`       | string   | External Id of the EGP  |
	      | `_vendorEgpOrgId`       | bool   | Organization Id of the EGP  |


8. Get All Seed Requests 
	-   **Signature**
       `getAllSeedRequests(_toExcluded, _count)`
   - **Parameters**
      | **Parameter** | **Type** | **Description**                                     |
      | ---------------|----------|-----------------------------------------------------|
      | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
      | `_count`   | uint256   | max count of items to return |
   -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `-` | [*GidSeedRequest*](#struct-gidseedrequest)  []  | List of all Seed Requests ever made |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |
        |  `length_` | uint256   | Total length of list |

9. Get All *Active* Seed Requests 
	-   **Signature**
       `getActiveSeedRequests(_toExcluded, _count)`
   - **Parameters**
      | **Parameter** | **Type** | **Description**                                     |
      | ---------------|----------|-----------------------------------------------------|
      | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
      | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | [*GidSeedRequest*](#struct-gidseedrequest) []  | List of all Seed Requests in **SUBMITTED** state |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |

10. Get All Seed Requests of a vendor
	-   **Signature**
       `getSeedRequestsForVendor(_gid, _toExcluded, _count)`
    - **Parameters**

        | **Parameter** | **Type** | **Description**                                     |
        | ---------------|----------|-----------------------------------------------------|
        | `_gid`       | string   | Gid of the Vendor |
         | `_toExcluded`   | uint256   | Initial call: any large value, Subsequent calls: pass `fromIncluded_` |
         | `_count`   | uint256   | max count of items to return |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `vendorSeedRequests_` | [*GidSeedRequest*](#struct-gidseedrequest)  []  | List of all Seed Requests of vendor with `_gid`  |
        |  `fromIncluded_` | uint256   | value to pass on subsequent call |


11. Get ultimate parent Gid of a Gid
	-   **Signature**
       `getUltimateParentGID(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid of any registered vendor |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | string  | ultimate parent Gid |

12. Get parent Gid of a Gid
	-   **Signature**
       `getParentGID(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid of any registered vendor |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | string  | parent Gid |
         
13. Get All Children Gids of a Gid, recursively
	-   **Signature**
       `getAllChildrenGIDs(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid of any registered vendor |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | string []  | list of all children Gids of `_gid` |

14. Get Children Gids of a Gid
	-   **Signature**
       `getChildrenGIDs(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid of any registered vendor |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | string []  | list of children Gids of `_gid` |

15. Check if a Gid exists
	-   **Signature**
       `isGidExists(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid value to check for |
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_gid`  exists<br> else false |

16. Check if a Gid Active
	-   **Signature**
       `isGidActive(_gid)`
    -   **Parameters**
        | **Parameter** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | `_gid` | string  | Gid value to check for |
    - **Requirements**
	    - `_gid` exists
    -   **Returns**
        | **Field** | **Type** | **Description**          |
        |---------------|----------|--------------------------|
         | - | bool  | True, if `_gid` active<br> else false |
   
17. #### Struct: ***MergeRequest*** 
| **Field** | **Type**                                         | **Description**                                                                                 |
|---------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `gid1`       | string | Gid of the registered Vendor                                                                    |
| `gid2`       | string | Another Gid of the same Vendor                                                                  |
| `state`  | [*MergeRequestState*](#enum-mergerequeststate) | enum |
| `version` | uint16  | version of contract |

18. #### Struct: ***GidSeedRequest*** 
| **Field** | **Type**                                         | **Description**                                                                                 |
|---------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `gid`       | string | Gid of the registered Vendor                                                                    |
| `vendorEgpId`       | string   | External Id of the EGP  |
| `vendorEgpOrgId`       | bool   | Organization Id of the EGP  |                               |
| `state`  | [*SeedRequestState*](#enum-seedrequeststate) | enum |
| `version` | uint16  | version of contract |

19. #### Struct: ***Vendor*** 
| **Field** | **Type** | **Description**          |
|---------------|----------|--------------------------|
| `gid`        | string   | global id of the Vendor |
| `accountName`        | string   | Vendor's blockchain username |
| `vendorEgpName`  | string   | Name of registered Vendor             |
| `vendorEgpId`       | string [] |  External Id of the EGPs    |
| `vendorEgpOrgId`       | string []   | Organization Id of the EGPs             |
| `version` | uint16  | version of contract |

20. #### Enum: ***MergeRequestState*** 
- INITIATED
- SUBMITTED
- APPROVED
- REJECTED
- EXPIRED

21. #### Enum: ***SeedRequestState*** 
- SUBMITTED
- APPROVED
- REJECTED
- EXPIRED
