# Upgrade Quire Contracts

- The below documentation can be used to re-deploy contracts present in `contracts/quire` directory. However not all contracts in this directory are re-deployed using the steps in this document. The following quire contracts cannot be re-deployed using the steps in this documentation:
1. QuireStorage.sol
2. QuireUpgradable.sol
3. QuireContracts.sol
- More on these contracts can be found in the upgradable documentation.

## Pre-requisites
- There is a file `scripts/constants.js` that contains contract names in UPPERCASE_SNAKE_CASE. This should be updated and consistent with the contract names in the KEY field of individual contracts. For example, VendorModel.sol contains a line `string constant internal KEY = "VENDOR_MANAGER"`. The same value "VENDOR_MANAGER" shoule be present in the `scripts/constants.js` file
- Truffle build artifacts currently in use are present in the path `build/contracts`. A backup of all deployed builds are present in the root directory and are named according to the commit hash (of this repository) for which this build was created. For example, `build-df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f/` contains the truffle build artifacts for commit `df9c0a29d7c5791f7fed583f542e3bd63d7cdf3f`. If no such directory is present, then it can be created for the stable build using script `./backupBuildLock.sh`. Before running this script make sure that local changes have been stashed and the current build is stable. Ideally this command should be run right after deployment of a fully tested commit.
- Paste the admin private key in the file `.private-key`

## Steps to Upgrade Quire Contracts
- Confirm all [*Pre-requisites*](#pre-requisites)
- Get the commit hash of the previous upgrade. To find it, look for the latest directory named `build-` followed by a commit hash. Grab this commit hash.
- Run `GUARDIAN_PUB_KEY='0xf9a731e46b2236cf3d8c35a2784e6b1a75598dcc' ./redeploy-quire.sh 47a51d5f7ce00931dfd1a8e0751f7dab602e5073`. The last parameter in this command should be the previous upgrade commit hash, as in the previous step. The value of GUARDIAN_PUB_KEY should be the public key corresponding to the private key in `.private-key` as mentioned in the pre-requisites.
- Now run `npx truffle exec scripts/create-config/create-config-no-bytecode.js` and `npx truffle exec scripts/create-config/create-config-bytecode.js` to create configs for backend
- Then run `./backupBuildLock.sh ` to backup the build for next upgrade
- Above commands will compile, migrate and re-register following quire contracts
1. MemberHelper.sol
2. MapHelper.sol
3. ListHelper.sol
4. ProcuringEntityModel.sol
5. ProcuringEntityManager.sol
6. VendorModel.sol
7. VendorManager.sol
8. AwardOfContractModel.sol
9. AwardOfContractManager.sol
10. WorkExperienceModel.sol
11. WorkExperienceManager.sol
12. BankModel.sol
13. BankManager.sol
14. PaymentAdviceModel.sol
15. PaymentAdviceManager.sol
16. BankGuaranteeModel.sol
17. BankGuaranteeManager.sol
18. BankGuaranteeReleaseModel.sol
19. BankGuaranteeReleaseManager.sol
