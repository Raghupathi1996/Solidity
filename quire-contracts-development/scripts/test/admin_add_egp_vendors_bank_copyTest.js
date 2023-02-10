const fs = require('fs');
var crypto = require("crypto");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PermissionsInterface = artifacts.require('PermissionsInterface');



const editData = (newData) => {
  path = './scripts/test/data_copy.json';
  fs.writeFileSync(path, JSON.stringify(newData));
  return newData;
}

module.exports = async function () {

  const data = JSON.parse(fs.readFileSync('./scripts/test/data_copy_copy.json'));

  const provider = new HDWalletProvider({
    privateKeys: [data.keys.admin.privateKey, 
      data.keys.egpKeys.egp_1.privateKey,
      data.keys.egpKeys.egp_2.privateKey,
      data.keys.bankKeys.bank1.privateKey, 
      data.keys.bankKeys.bank2.privateKey, 
      data.vdrKeys.vendor1.privateKey, 
      data.vdrKeys.vendor2.privateKey, 
      data.vdrKeys.vendor3.privateKey, 
      data.vdrKeys.vendor4.privateKey, 
      data.vdrKeys.vendor5.privateKey, 
      data.vdrKeys.vendor6.privateKey, 
      data.vdrKeys.vendor7.privateKey, 
      data.vdrKeys.vendor8.privateKey, 
      data.vdrKeys.vendor9.privateKey, 
      data.vdrKeys.vendor10.privateKey],
    providerOrUrl: "http://127.0.0.1:22000/",
    chainId: 10
  });

  PermissionsInterface.setProvider(provider);
    
  let pIntf = await PermissionsInterface.deployed();


    // Onboard e-GP_1
    console.log("Onboarding eGP", data.egp.egp_1);
    await pIntf.addSubOrg("ADMINORG",data.egp.egp_1,"","",0,0, {from: data.keys.admin.address});
    await pIntf.addNewRole("TRANSACT",`ADMINORG.${data.egp.egp_1}`,5,false,false, {from: data.keys.admin.address});
    console.log("newRole added");
    let keyPE = data.keys.egpKeys.egp_1;
    let assignAccRole = await pIntf.assignAccountRole(keyPE.address,`ADMINORG.${data.egp.egp_1}`,"TRANSACT", {from: data.keys.admin.address});
    console.log(`Registered new account with ${data.egp.egp_1}: ` + keyPE.address);
    console.log(keyPE.privateKey + "\n");
   
    // await editData(data);
    return assignAccRole;
};