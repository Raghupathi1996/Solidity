#!/bin/bash
set -e

./compile-contracts.sh 

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

GUARDIAN_PUB_KEY=${GUARDIAN_PUB_KEY} npx truffle migrate --f 5 --to 19

echo "Changing Permissions Interface and Implementation"
npx truffle exec scripts/upgrade/changePermInterface.js $2 $3 $4 accounts.txt
npx truffle exec scripts/upgrade/changePermImplementation.js $2 $3 $4 accounts.txt
echo "Restarting Network"
cp permission-config.json ../quire-blockchain/quorum-examples/examples/7nodes/
cd ../quire-blockchain/quorum-examples/
docker-compose down
PRIVATE_CONFIG=ignore QUORUM_CONSENSUS=raft EPERM=true INIT=false docker-compose up -d
cd -
echo "Unregistering Old Permissions Contracts"
npx truffle exec scripts/upgrade/unregisterPermContracts.js
echo "Registering new Permissions Contracts"
npx truffle exec scripts/upgrade/registerPermContracts.js
GUARDIAN_PUB_KEY=${GUARDIAN_PUB_KEY} npx truffle migrate --f 26 --to 43
echo "Unregistering Old Quire Contracts"
npx truffle exec scripts/upgrade/unregisterQuireContracts.js
echo "Registering new Quire Contracts"
npx truffle exec scripts/upgrade/registerQuireContracts.js 

echo "Done"