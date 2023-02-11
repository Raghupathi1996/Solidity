# Upgrade Permissions and Quire Contracts

This documentation contains steps to upgrade all contracts, both Permissions and Quire Contracts which can be found in `contracts/permissions` and `contracts/quire` directories.
This document does not cover the upgrades of Storage, Upgradable and Contract Registry contracts. There are 6 contracts which cannot be upgraded, 3 each for Permissions and Quire. They are as follows:
1. `contracts/permissions/EternalStorage.sol`
2. `contracts/permissions/PermissionsUpgradable.sol`
3. `contracts/permissions/ContractRegistry.sol`
4. `contracts/quire/QuireStorage.sol`
5. `contracts/quire/QuireUpgradable.sol`
6. `contracts/quire/QuireContracts.sol`

We call these as Permanent Contracts.
All remaining contracts can be upgraded by following the steps mentioned below

## Pre-requisites
- Make sure there is an `accounts.txt` file present in the root directory containing admin account addresses on each seperate line.
- Fetch the network details which include the following:
1. Network Admin Org, usually `ADMINORG`
2. Network Admin Role, usually `ADMIN`
3. Org Admin Role, usually `ORGADMIN`
- There is a file `scripts/constants.js` that contains contract names in UPPERCASE_SNAKE_CASE. This should be updated and consistent with the contract names in the KEY field of individual contracts. For example, VendorModel.sol contains a line `string constant internal KEY = "VENDOR_MANAGER"`. The same value "VENDOR_MANAGER" should be present in the `scripts/constants.js` file
- Truffle build artifacts currently in use are present in the path `build/contracts`. A backup of all deployed builds are present in the root directory and are named according to the commit hash (of this repository) for which this build was created, `build-commitHash/`. For example, `build-df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f/` contains the truffle build artifacts for commit `df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f`. If no such directory is present, then it can be created for the stable build using script `./backupBuildLock.sh`. Before running this script make sure that local changes have been stashed and the current build is stable. Ideally this command should be run right after deployment of a fully tested commit.
- Paste the admin private key in the file `.private-key`

## Re-deploy Permissions and Quire contracts, manually
- Run `npx truffle exec scripts/upgrade/unregisterPermContracts.js`. This will unregister the old permission contracts.
- Run `npx truffle exec scripts/upgrade/unregisterQuireContracts.js `. This will unregister the old quire contracts
- We cannot update the following permanent contacts:
1. EternalStorage.sol
2. QuireStorage.sol
3. ContractRegistry.sol
4. QuireContracts.sol
5. PermissionsUpgradable.sol
6. QuireUpgradable.sol
- As mentioned in [pre-requisites](#pre-requisites), make sure the build artifacts for these permanent contracts are present in a `build-commitHash` directory created by a previous upgrade. For example if commit `df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f` was deployed previously, then this directory will have name `build-df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f`
- To build all contracts run `./compile-contracts.sh`
- This will also build the above mentioned permanent contracts. So copy each of these permanent contracts from `build-commitHash/` and replace them in `build/contracts/` directory.
- Then redeploy the other permissions contracts. Run `GUARDIAN_PUB_KEY='0xed9d02e382b34818e88B88a309c7fe71E65f419d' npx truffle migrate --f 5 --to 19`
- Make sure there is an `accounts.txt` file present in the root directory containing accounts addresses on each seperate line.
- Then run `npx truffle exec scripts/upgrade/changePermInterface.js ADMINORG ADMIN ORGADMIN accounts.txt`. Here, `accounts.txt` is the file containing admin account addresses from previous step, `ADMINORG` is the name of the network admin org, `ADMIN` is the role of the network admin, `ORGADMIN` is the role assigned to account that behaves as admin of any org. If these names are to be replaced, it should be replaced in this command itself. This will replace the PermissionsInterface.sol contract. This step can be skipped if the interface is unchanged and the corresponding migration is skipped in previous step. The previous build of this contract should also be preserved in `build-lock/PermissionsInterface.json`
- Then run `npx truffle exec scripts/upgrade/changePermImplementation.js ADMINORG ADMIN ORGADMIN accounts.txt`. Here, `accounts.txt` is the file containing admin account addresses from previous step, `ADMINORG` is the name of the network admin org, `ADMIN` is the role of the network admin, `ORGADMIN` is the role assigned to account that behaves as admin of any org. If these names are to be replaced, it should be replaced in this command itself. This will replace the PermissionsImplementation. This step can also be skipped. However PermissionImplementation has to be updated if any of the AccountManager, OrgManager, RoleManager, NodeManager, VoterManager contracts is updated. If none of these contracts are updated, their redeployment can be skipped along with redeployment of PermissionsImplementation.
- Since permission-config has been updated, we need to restart the network with new config. This is only the case when Implementation or Interface contracts have been changed. Copy the `permission-config.json` and paste it in the `examples/7nodes` directory in `quire-blockchain/quorum-examples` workspace. Then restart the network by running `PRIVATE_CONFIG=ignore QUORUM_CONSENSUS=raft EPERM=true INIT=false docker-compose up -d`. The exact command to restart the network can be found in the `quire-blockchain/quorum-examples` repository.
- Then run `npx truffle exec scripts/upgrade/registerPermContracts.js`. This will register the new contracts.
- This will complete the redeploying of permissions contracts. A new `permission-config.json` is created whenever we change PermissionInterface and/or PermissionImplementation. The new `permission-config.json` should be used whenever a node is restarted.
- Run `GUARDIAN_PUB_KEY='0xed9d02e382b34818e88B88a309c7fe71E65f419d' npx truffle migrate --f 26 --to 43`. This will redeploy the Quire Contracts. If a contract is unchanged and its corresponding JSON build is preserved in build-lock/, then we can skip migrating that contract.
- Then run `npx truffle exec scripts/upgrade/registerQuireContracts.js `. This will register the new quire contracts.
- At this point we have completed upgrading our changed contracts or all contracts which are not part of the 6 permanent contracts mentioned above. The build of the permanent contracts and all other contracts that are expected to not be frequently updated should be preserved in build-lock/ directory. Currently we run the command `./backupBuildLock.sh`. This creates a directory `build-commitHash` (example: `build-26b5ea3c3fe04c20b9992d4afdd5791e41ebf038`) which contains a backup of these contracts

## Re-deploy Permissions and Quire contracts, using script
All the steps in previous [previous section](#re-deploy-permissions-and-quire-contracts-manually) can be executed using the script `./redeploy-perm.sh` 
- Run `GUARDIAN_PUB_KEY='0xed9d02e382b34818e88B88a309c7fe71E65f419d' ./redeploy-perm.sh 26b5ea3c3fe04c20b9992d4afdd5791e41ebf038 ADMINORG ADMIN ORGADMIN` to upgrade both Permissions and Quire Contracts. However, we need to take care of the following:
- The value for env variable `GUARDIAN_PUB_KEY` should be the public key corresponding to the admin private key present in the file `.private-key`
- The 1st parameter to the script is the commit hash of the previously deployed contracts
- The 2nd, 3rd and 4th parameters are the Network Admin Org, Network Admin Role and Org Admin Role respectively.
- In the script, we also copy the `permission-config.json` to the `quorum-examples/examples/7nodes` directory in the `quire-blockchain` workspace. Make sure the relative path to the `quire-blockchain` workspace is correct in the script. If this workspace is on different machine, then it is adviced to run each step manually, as in [previous section](#re-deploy-permissions-and-quire-contracts-manually)

## Internal Steps

Note: Below steps are run automatically internally. It is adviced to not follow these steps without clarity. We recomment upgrading contracts using steps in sections above.

- We can update one of the following permissions contacts:
1. PermissionsInterface.sol
To replace this contract, deploy the new PermissionsInterface.sol contract. Keep the following function in the new contract
`setPermImplementation(address _permImplementation)`
Using guardian account, call `changeInterface(address _proposedInterface)` in the PermissionsUpgradable.sol contract. Pass it the address of the newly deployed Interface contract. Re-migrate all contracts that depend on this contract. PermissionsInterface can also be updated by running `npx truffle exec scripts/upgrade/changePermInterface.js ADMINORG ADMIN ORGADMIN accounts.txt`. Note that after this change, nodes in the network should be restarted with new `permission-config.json` file. This should have updated address of PermissionsInterface.
2. PermissionsImplementation.sol
To replace this contract, migrate the new contract, then run `permissionsUpgradable.confirmImplChange(permissionsImplementation.address)` with the new contract address. Optionally we can run `npx truffle exec scripts/upgrade/changePermImplementation.js ADMINORG ADMIN ORGADMIN accounts.txt`. Note that after this change, nodes in the network should be restarted with new `permission-config.json` file. This should have updated address of PermissionsInterface.
3. MemberHelper.sol, ListHelper.sol, MapHelper.sol
These are helper contracts with access to the EternalStorage contract. After replacing them with new migrations, call following function of PermissionsUpgradable.sol with the new contract name and address as arguments
`await permissionsUpgradable.registerContract(CONTRACT_NAME, memberHelper.address)`
This needs to be done for every contract/account that needs to fetch and store data in the Eternal Storage contract
4. AccountModel.sol, OrgModel.sol, RoleModel.sol, NodeModel.sol, VoterModel.sol
These contracts interact with the Member, List and Map helper contracts and return data to the respective Manager Contracts. If we replace them, we need to replace the respective manager contracts as well.
4. AccountManager.sol, OrgManager.sol, RoleManager.sol, NodeManager.sol, VoterManager.sol
These contracts can be replaced directly. After replacing these contracts we need to replace PermissionsImplementation as well
After migrating new contract, migrate PermissionsImplentation.sol with new address of the above contacts.
Then call `confirmImplChange(address _proposedImpl)` of PermissionsUpgradable.sol with new implemetation address

