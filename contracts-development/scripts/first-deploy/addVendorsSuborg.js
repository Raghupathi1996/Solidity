const PermissionsInterface = artifacts.require('PermissionsInterface');

module.exports = async function (callback) {
  if(process.argv.length!=7) {
    throw new Error("only three arguments could be passed: <ADMIN_ORG> <VENDOR_ORG> <ROLE>")
  } 
  const adminOrg = process.argv[4]
  const vendorOrg = process.argv[5]
  const role = process.argv[6]
  const permissionsInterface = await PermissionsInterface.deployed();
  await permissionsInterface.addNewRole(role,adminOrg,5,false,false);
  await permissionsInterface.addSubOrg(adminOrg,vendorOrg,"","",0,0);
  await permissionsInterface.addNewRole(role,`${adminOrg}.${vendorOrg}`,5,false,false);
  callback();
};