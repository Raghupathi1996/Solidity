const fs = require('fs');
var crypto = require("crypto");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PermissionsInterface = artifacts.require('PermissionsInterface');
const VendorManager = artifacts.require('VendorManager');
const BankManager = artifacts.require('BankManager');


const editData = (newData) => {
  path = './scripts/test/data_copy.json';
  fs.writeFileSync(path, JSON.stringify(newData));
  return newData;
}

const vendorsGid = (count) => {
  var json = "{";
  for (var i = 1; i <= count; i++) {
  //   vendor1: "v1_"+crypto.randomBytes(2).toString('hex'),
      i == count ? json  += `\"vendor${i}\":\"\"` : json  += `\"vendor${i}\":\"\",`;
  }
  json += "}";
  // console.log("json:",json);
  json = JSON.parse(json);
  return json;
}

module.exports = async function (callback) {

  const data = JSON.parse(fs.readFileSync('./scripts/test/data_copy.json'));

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
  VendorManager.setProvider(provider);
  BankManager.setProvider(provider);
    
  let pIntf = await PermissionsInterface.deployed();
  let venm = await VendorManager.deployed();
  let bankm = await BankManager.deployed();

    // Onboard e-GP_1
    console.log("Onboarding eGP", data.egp.egp_1);
    await pIntf.addSubOrg("ADMINORG",data.egp.egp_1,"","",0,0, {from: data.keys.admin.address});
    await pIntf.addNewRole("TRANSACT",`ADMINORG.${data.egp.egp_1}`,5,false,false, {from: data.keys.admin.address});
    console.log("newRole added");
    let keyPE = data.keys.egpKeys.egp_1;
    await pIntf.assignAccountRole(keyPE.address,`ADMINORG.${data.egp.egp_1}`,"TRANSACT", {from: data.keys.admin.address});
    console.log(`Registered new account with ${data.egp.egp_1}: ` + keyPE.address);
    console.log(keyPE.privateKey + "\n");

    // Onboard e-GP_2
    console.log("Onboarding eGP", data.egp.egp_2);
    await pIntf.addSubOrg("ADMINORG",data.egp.egp_2,"","",0,0, {from: data.keys.admin.address});
    await pIntf.addNewRole("TRANSACT",`ADMINORG.${data.egp.egp_2}`,5,false,false, {from: data.keys.admin.address});
    console.log("newRole added");
    keyPE = data.keys.egpKeys.egp_2;
    await pIntf.assignAccountRole(keyPE.address,`ADMINORG.${data.egp.egp_2}`,"TRANSACT", {from: data.keys.admin.address});
    console.log(`Registered new account with ${data.egp.egp_2}: ` + keyPE.address);
    console.log(keyPE.privateKey + "\n");

    // Onboard Vendor1
    console.log("Onboarding Vendor against eGP_1");
    let vendorGidObject = {};
    // var obj = vendorsGid(10);
    // console.log(obj);
    vendorGidObject.vendorGid = {...vendorGidObject.vendorGid, ...vendorsGid(10)}
    // console.log(vendorGidObject);
    for ( const [key, value] of Object.entries(data.vdrKeys)) {
      // json.vdrKeys[key]
      console.log("Onboarding Vendor", key);
      let keyV1 = data.vdrKeys[key];
      // console.log(keyV1.address);
      await pIntf.assignAccountRole(keyV1.address,"ADMINORG.VENDORS","TRANSACT", {from: data.keys.admin.address});
      await pIntf.assignAccountName(keyV1.address,data.vendor[key], {from: data.keys.admin.address})
      let gidVen1 = await venm.registerVendor(data.vendor[key],"test_externalId",data.egp.egp_1,data.vendor[key], {from: data.keys.admin.address});
      vendorGidObject.vendorGid[key] = gidVen1.logs[0].args._vendorGid;
      // data.gids.ven1Gid = gidVen1.logs[0].args._vendorGid;
      // console.log(gidVen1.logs[0]);
      // console.log(data.gids.ven1Gid);
      let activeVen1Gid = await venm.isGidActive(vendorGidObject.vendorGid[key]);
      console.log("regVen1Gid",activeVen1Gid);
      console.log(`Registered vendor ${data.vendor[key]} ` + keyV1.address);
      // console.log(data.gids.ven1Gid);
      // console.log(keyV1.privateKey + "\n");
      let length = await venm.getActiveVendorListLength({from: data.keys.admin.address});
      console.log("length of the vendor",JSON.stringify(length), "\n");
    }
    data.gids = {...data.gids, ...vendorGidObject};

    //Onboard Bank1
    console.log("Onboarding Bank", data.bank.bank1);
    let keyB1 = data.keys.bankKeys.bank1;
    await pIntf.assignAccountRole(keyB1.address,"ADMINORG.BANKS","TRANSACT", {from: data.keys.admin.address});
    await pIntf.assignAccountName(keyB1.address,data.bank.bank1, {from: data.keys.admin.address});
    console.log("added banks new role");
    let gid1Bank = await bankm.registerBank(crypto.randomBytes(2).toString('hex'), crypto.randomBytes(2).toString('hex'), data.bank.bank1, {from: data.keys.admin.address});
    data.gids.bank1Gid = gid1Bank.logs[0].args._bankGid;
    console.log(`Registered bank ${data.bank.bank1} ` + keyB1.address);
    console.log(data.gids.bank1Gid);

    console.log(keyB1.privateKey + "\n");

    //Onboard Bank2
    console.log("Onboarding Bank", data.bank.bank2);
    let keyB2 = data.keys.bankKeys.bank2;
    await pIntf.assignAccountRole(keyB2.address,"ADMINORG.BANKS","TRANSACT", {from: data.keys.admin.address});
    await pIntf.assignAccountName(keyB2.address,data.bank.bank2, {from: data.keys.admin.address});

    let gid2Bank = await bankm.registerBank(crypto.randomBytes(2).toString('hex'), crypto.randomBytes(2).toString('hex'), data.bank.bank2, {from: data.keys.admin.address});
    data.gids.bank2Gid = gid2Bank.logs[0].args._bankGid;
    console.log(`Registered bank ${data.bank.bank2} ` + keyB2.address);
    console.log(data.gids.bank2Gid);

    console.log(keyB2.privateKey + "\n");

    await editData(data);

    // publishBankGuarantee({"uid":"0x00000000","bankGid":"MMNR83HM","paymentAdviceNumber":"45","paymentAdviceUid":'0xcd49d8b00ef078fd',"referenceNumber":"sad","branchName":"3","bankRepresentativeName":"0x","issuanceDate":"0x","validityPeriod":"0x","claimExpiryDate":"0x00000000000000000000000000000000000000000000000000000000000000ff","validFrom":"0x","validTill":"0x","amount":"0x00000000000000000000000000000000000000000000000000000000000000ff","beneficiaryName":"0x","fileHash":"3","bankEncryptedKey":"3","egpEncryptedKey":"3","vendorEncryptedKey":"3","version":""})

    callback();
};