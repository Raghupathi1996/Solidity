#!/bin/bash
set -e

./compile-contracts.sh 

GUARDIAN_PUB_KEY=${GUARDIAN_PUB_KEY} npx truffle migrate --f 1 --to 19

echo "Init Perm Upgradable"
npx truffle exec scripts/first-deploy/initPermUpgradable.js $1 $2 $3 accounts.txt

echo "Registering new Permissions Contracts"
npx truffle exec scripts/first-deploy/registerPermContracts.js 

echo "Restarting Network"
cp permission-config.json ../quire-blockchain/quorum-examples/examples/7nodes/
cd ../quire-blockchain/quorum-examples/
docker-compose down
PRIVATE_CONFIG=ignore QUORUM_CONSENSUS=raft EPERM=true INIT=false docker-compose up -d
cd -

echo "VENDORS Suborg"
npx truffle exec scripts/first-deploy/addVendorsSuborg.js $1 $5 $4

echo "Migrate Quire"
GUARDIAN_PUB_KEY=${GUARDIAN_PUB_KEY} npx truffle migrate --f 23 --to 43

echo "Init Quire Upgradable"
npx truffle exec scripts/first-deploy/initQuireUpgradable.js
echo "Registering new Quire Contracts"
npx truffle exec scripts/first-deploy/registerQuireContracts.js 

echo "BANKS suborg"
npx truffle exec scripts/first-deploy/addBanksSuborg.js $1 $6 $4

echo "Saving Backup"
./backupBuildLock.sh 

echo "Done"
