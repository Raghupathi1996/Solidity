#!/bin/bash
set -e

npx truffle exec scripts/test/initData.js
npx truffle exec scripts/test/addFieldsinInit.js
npx truffle exec scripts/test/admin_add_egp_vendors_bank.js
npx truffle exec scripts/test/egprep_register_pe_aocs_wxs.js
npx truffle exec scripts/test/egprep_register_pe_aocs_Status.js
npx truffle exec scripts/test/uploadingWorkExperience.js
npx truffle exec scripts/test/mergeVendorGids.js 
npx truffle exec scripts/test/VcnFunctionalManager.js
npx truffle exec scripts/test/PaymentAdviceManager.js
