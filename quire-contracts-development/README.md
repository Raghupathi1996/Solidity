# Quire Contracts
Truffle project to deploy Quire smart contracts. 
Truffle deploys the enhanced permissioning smart contracts and initializes the Permissions Upgradable contract, after which the Quorum network can be restarted to start the enhanced permissioning model. Then we can deploy the Quire Contracts

## DONOT
- Do NOT run following functions:
2. PermissionsUpgradable::changeUpgradable(...)
4. QuireUpgradable::changeUpgradable(...)

## How to compile
- We use truffle version v5.4.11 to compile the contracts. Install using `npm i -g truffle@5.4.11`
1. Run `./compile-contracts.sh` to build all contracts
    - can additionally take a list of contract names to compile instead of all quire contracts
      - `./compile-contracts.sh VendorManager VendorModel` builds only **vendorManager** and **vendorModel** contracts.
    

## How to migrate for the first time, manual steps
- Install truffle v5.4.11 globally `npm i -g truffle@5.4.11`
- Compile all contracts using `./compile-contracts.sh` as mentioned above.
- Run `npm i`. This installs truffle v5.0.42 locally which can be accessed using `npx truffle version` 
- Create a file `.private-key` in the root directory and paste the private key that you want to use. The private key should have '0x' prefix.
- Run `GUARDIAN_PUB_KEY='0x2c7536E3605D9C16a7a3D7b1898e529396a65c23' npx truffle migrate --f 1 --to 19`. The `GUARDIAN_PUB_KEY` should be the public key corresponding to the private key in the above step.
- Make sure there is an `accounts.txt` file present in the root directory containing accounts addresses on each seperate line.
- Then run `npx truffle exec scripts/first-deploy/initPermUpgradable.js ADMINORG ADMIN ORGADMIN accounts.txt`. Here, `accounts.txt` is the file containing admin account addresses from previous step, `ADMINORG` is the name of the network admin org, `ADMIN` is the role of the network admin, `ORGADMIN` is the role assigned to account that behaves as admin of any org. If these names are to be replaced, it should be replaced in this command itself.
- Then run `npx truffle exec scripts/first-deploy/registerPermContracts.js `
- A permission-config.json file is created that can be used to start the enhanced permissioning model in Quorum.
- Copy the permission-config.json and paste it in the examples/7nodes directory in quire-blockchain/quorum-examples workspace. Then restart the network by running `PRIVATE_CONFIG=ignore QUORUM_CONSENSUS=raft EPERM=true INIT=false docker-compose up -d`. For more information refer [here](https://github.com/crubn/quire-blockchain#restart-network)
- After network restart, run `npx truffle exec scripts/first-deploy/addVendorsSuborg.js  ADMINORG VENDORS TRANSACT`. This will add VENDORS suborg and also create and assign a TRANSACT role to ADMINORG and VENDORS
- Then run `GUARDIAN_PUB_KEY='0x2c7536E3605D9C16a7a3D7b1898e529396a65c23' npx truffle migrate --f 23 --to 43`. This will deploy the Quire Contracts
- Then run `npx truffle exec scripts/first-deploy/initQuireUpgradable.js`
- Then run `npx truffle exec scripts/first-deploy/registerQuireContracts.js`. This will register the quire contracts for storage access.
- To access truffle console, run `npx truffle console`. Truffle console works well with truffle v5.0.42
- After initial deployment, do not forget to create a backup of truffle build. It is recommened to back up the entire build.
- Optionally we can just back up the build for the permanent contracts. Run `./backupBuildLock.sh ` to save them in a build-commit-hash/ directory

## How to migrate for the first time, using script

- The steps in the above section can be done by a single script `GUARDIAN_PUB_KEY='0xed9d02e382b34818e88B88a309c7fe71E65f419d' ./dev-start.sh ADMINORG ADMIN ORGADMIN TRANSACT VENDORS BANKS`. Make sure the relative paths for quire-contracts and quorum-examples (network docker compose) are correct in the script.


## How to redeploy Permissions and Quire contracts after change

Follow the steps [in this documentation](./UPGRADE_PERM.md).
It has steps to upgrade both Permissions and Quire Contracts, both manually and using a script.


## How to redeploy only Quire contracts after change

Follow the steps [in this documentation](./UPGRADE_QUIRE.md).
It has steps to upgrade all Quire Contracts (excluding permanent contracts), both manually and using a script.


## How to upgrade individual contract

- To replace existing contract we first unregister the existing contract, compile the changes, then deploy, and then register the new contract address for db access. For this, we need the name of the contract(in PascalCase) and the number in the migration file used to migrate the contract.
For example, to replace VendorManager, we need the following
1. Name: `VendorManager`
2. Migration Number: 33 since we run `npx truffle migrate --f 33 --to 33` to migrate VendorManager
- We can then run the following to replace the old VendorManager contract with the new one
- `./compile-contracts.sh VendorManager`
- `npx truffle migrate --f 33 --to 33`
- `npx truffle exec scripts/upgrade/unregisterQuireContracts.js VendorManager`
- `npx truffle exec scripts/upgrade/registerQuireContracts.js VendorManager`
- We then need to remigrate other contracts (for example, AwardOfContractManager) that depend on the replaced contract address.

## How to create config for backend

- We create two config files for our backend. Following are the files and command to create them.
1. config.json
`npx truffle exec scripts/create-config/create-config-no-bytecode.js`
2. config_bytecode.json
`npx truffle exec scripts/create-config/create-config-bytecode.js`

## WRITE access design

- The EternalStorage contract stores address to bool mapping for contracts that are allowed to WRITE
- The ContractRegistry.sol contract, stores contract_name to address mapping to fetch contract address by contract name.
- All network contracts are allowed to WRITE directly in the EternalStorgae.sol contract.
Access is granted after every upgrade using `npx truffle exec scripts/upgrade/registerQuireContracts.js`
- However only MapHelper.sol, MemberHelper.sol and ListHelper.sol call the EternalStorage.sol contract directly.
- The MapHelper.sol, MemberHelper.sol and ListHelper.sol contracts internally check if the caller is allowed access to the EternalStorage.sol contract. A modifier is used for the same in all the WRITE functions in these contracts.
- However, usually only AccountModel.sol, OrgModel.sol, NodeModel.sol, RoleModel.sol and VoterModel.sol call the functions in the MapHelper.sol, MemberHelper.sol and ListHelper.sol contracts.
- AccountModel.sol has a modifier for all WRITE functions which allows only calls from the AccountManager.sol contract. The ContractRegistry.sol contract is used for the same to fetch the contract address registered as "ACCOUNT_MANAGER". Same is true for the other 4 permissions contracts (OrgManager, NodeManager, RoleManager and VoterManager).

### Contracts Documentation

* [QuireContracts](./docs/QuireContracts.md)
* [ProcEntityManager](./docs/ProcEntityManager.md)
* [VendorManager](./docs/VendorManager.md)
* [AwardOfContractManager](./docs/AwardOfContractManager.md)
* [WorkExperienceManager](./docs/WorkExperienceManager.md)
* [BankManager](./docs/BankManager.md)
* [BankGuaranteeManager](./docs/BankGuaranteeManager.md)
* [BankGuaranteeReleaseManager](./docs/BankGuaranteeReleaseManager.md)

### Other Documentations
* [UPGRADE_QUIRE](./UPGRADE_QUIRE.md)
* [UPGRADE_PERM](./UPGRADE_PERM.md)
* [QUIRE_CONTRACTS_DESIGN](./QUIRE_CONTRACTS.md)
* [PERM_CONTRACTS_DESIGN](./PERM_CONTRACTS.md)

