#!/bin/bash
set -e

# ./compile-contracts.sh 

rm build/contracts/ContractRegistry.json
rm build/contracts/EternalStorage.json
rm build/contracts/Migrations.json
rm build/contracts/PermissionsUpgradable.json
rm build/contracts/QuireStorage.json
rm build/contracts/QuireContracts.json
rm build/contracts/QuireUpgradable.json 
cp build-$1/ContractRegistry.json build/contracts/
cp build-$1/EternalStorage.json build/contracts/
cp build-$1/Migrations.json build/contracts/
cp build-$1/PermissionsUpgradable.json build/contracts/
cp build-$1/QuireStorage.json build/contracts/
cp build-$1/QuireContracts.json build/contracts/
cp build-$1/QuireUpgradable.json build/contracts/

rm build/contracts/AccountModel.json 
rm build/contracts/AccountManager.json
rm build/contracts/OrgModel.json
rm build/contracts/OrgManager.json
rm build/contracts/RoleModel.json
rm build/contracts/RoleManager.json
rm build/contracts/NodeModel.json
rm build/contracts/NodeManager.json
rm build/contracts/VoterModel.json
rm build/contracts/VoterManager.json 
rm build/contracts/PermissionsInterface.json 
rm build/contracts/PermissionsImplementation.json 
rm build/contracts/MapHelper.json 
rm build/contracts/MemberHelper.json 
rm build/contracts/ListHelper.json 

cp build-$1/AccountModel.json build/contracts/
cp build-$1/AccountManager.json build/contracts/
cp build-$1/OrgModel.json build/contracts/
cp build-$1/OrgManager.json build/contracts/
cp build-$1/RoleModel.json build/contracts/
cp build-$1/RoleManager.json build/contracts/
cp build-$1/NodeModel.json build/contracts/
cp build-$1/NodeManager.json build/contracts/
cp build-$1/VoterModel.json build/contracts/
cp build-$1/VoterManager.json build/contracts/
cp build-$1/PermissionsInterface.json build/contracts/
cp build-$1/PermissionsImplementation.json build/contracts/
cp build-$1/MapHelper.json build/contracts/
cp build-$1/MemberHelper.json build/contracts/
cp build-$1/ListHelper.json build/contracts/


GUARDIAN_PUB_KEY=${GUARDIAN_PUB_KEY} npx truffle migrate --f 26 --to 46
echo "Unregistering Old Quire Contracts"
npx truffle exec scripts/upgrade/unregisterQuireContracts.js
echo "Registering new Quire Contracts"
npx truffle exec scripts/upgrade/registerQuireContracts.js 

echo "Done"