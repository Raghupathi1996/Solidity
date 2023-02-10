const fs = require('fs');

const EternalStorage = artifacts.require('EternalStorage');
const PermissionsImplementation = artifacts.require('PermissionsImplementation');
const PermissionsInterface = artifacts.require('PermissionsInterface');
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const AccountManager = artifacts.require('AccountManager');
const NodeManager = artifacts.require('NodeManager');
const OrgManager = artifacts.require('OrgManager');
const RoleManager = artifacts.require('RoleManager');
const VoterManager = artifacts.require('VoterManager');
const ContractRegistry = artifacts.require('ContractRegistry');

module.exports = async function (callback) {

  if(process.argv.length!=8) {
    throw new Error("only four arguments could be passed: <ADMIN_ORG> <ADMIN_ROLE> <ORG_ADMIN_ROLE> <ACCOUNTS_FILENAME>")
  } 
  const adminOrg = process.argv[4]
  const adminRole = process.argv[5]
  const orgAdminRole = process.argv[6]
  const accountsFileName = process.argv[7]
  const accounts = fs.readFileSync(accountsFileName).toString().split("\n")
  
  const eternalStorage = await EternalStorage.deployed();
  const permissionsImplementation = await PermissionsImplementation.deployed();
  const permissionsInterface = await PermissionsInterface.deployed();
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const contractRegistry = await ContractRegistry.deployed();
  await permissionsUpgradable.init(permissionsInterface.address, permissionsImplementation.address, eternalStorage.address, contractRegistry.address);
  
  const permissionConfig = {
    permissionModel: 'v2',
    upgradableAddress: permissionsUpgradable.address,
    interfaceAddress: permissionsInterface.address,
    implAddress: permissionsImplementation.address,
    nodeMgrAddress: NodeManager.address,
    accountMgrAddress: AccountManager.address,
    roleMgrAddress: RoleManager.address,
    voterMgrAddress: VoterManager.address,
    orgMgrAddress: OrgManager.address,
    nwAdminOrg: adminOrg,
    nwAdminRole: adminRole,
    orgAdminRole: orgAdminRole,
    accounts: accounts,
    subOrgBreadth: 99,
    subOrgDepth: 99
  };
  try {
    await fs.writeFileSync('permission-config.json', JSON.stringify(permissionConfig))
    console.log('File written successfully\n');
    console.log(fs.readFileSync('permission-config.json', 'utf8'));
  } catch (error) {
    console.log(error);
  }

  callback();
};