const PermissionsInterface = artifacts.require('PermissionsInterface');

module.exports = async function (callback) {
  if(process.argv.length!=7) {
    throw new Error("only three arguments could be passed: <ADMIN_ORG> <BANK_ORG> <ROLE>")
  } 
  const adminOrg = process.argv[4]
  const bankOrg = process.argv[5]
  const role = process.argv[6]
  const permissionsInterface = await PermissionsInterface.deployed();
  await permissionsInterface.addSubOrg(adminOrg,bankOrg,"","",0,0);
  await permissionsInterface.addNewRole(role,`${adminOrg}.${bankOrg}`,5,false,false);
  callback();
};