const fs = require('fs');
var crypto = require("crypto");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PermissionsInterface = artifacts.require('PermissionsInterface');
const VendorManager = artifacts.require('VendorManager');
const BankManager = artifacts.require('BankManager');


const editData = (newData) => {
  path = './scripts/test/data.json';
  fs.writeFileSync(path, JSON.stringify(newData));
  return newData;
}

module.exports = async function (callback) {

  const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

  const provider = new HDWalletProvider({
    privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank1.privateKey, data.keys.bank2.privateKey],
    providerOrUrl: "http://127.0.0.1:22000/",
    chainId: 10
  });

  PermissionsInterface.setProvider(provider);
  VendorManager.setProvider(provider);
  BankManager.setProvider(provider);
    
  let pIntf = await PermissionsInterface.deployed();
  let venm = await VendorManager.deployed();
  let bankm = await BankManager.deployed();

    // Onboard e-GP
    await pIntf.addSubOrg("ADMINORG",data.egp,"","",0,0, {from: data.keys.admin.address});
    await pIntf.addNewRole("TRANSACT",`ADMINORG.${data.egp}`,5,false,false, {from: data.keys.admin.address});
    let keyPE = data.keys.egp;
    await pIntf.assignAccountRole(keyPE.address,`ADMINORG.${data.egp}`,"TRANSACT", {from: data.keys.admin.address});
    console.log(`Registered new account with ${data.egp}: ` + keyPE.address);
    console.log(keyPE.privateKey + "\n");

    // Onboard Vendor1
    let keyV1 = data.keys.vendor1
    console.log("1");
    await pIntf.assignAccountRole(keyV1.address,"ADMINORG.VENDORS","TRANSACT", {from: data.keys.admin.address});
    console.log("2");
    await pIntf.assignAccountName(keyV1.address,data.vendor1, {from: data.keys.admin.address})
    let gidVen1 = await venm.registerVendor("test_vendor","test_externalId","test_externalOrgId",data.vendor1, {from: data.keys.admin.address});
    console.log("4");
    data.gids.ven1Gid = gidVen1.logs[0].args._vendorGid;
    console.log(gidVen1.logs[0]);

    console.log(data.gids.ven1Gid);
    console.log("5");
    let activeVen1Gid = await venm.isGidActive(data.gids.ven1Gid);
    console.log("6");
    console.log("regVen1Gid",activeVen1Gid);
    console.log(`Registered vendor ${data.vendor1} ` + keyV1.address);
    console.log(data.gids.ven1Gid);
    console.log(keyV1.privateKey + "\n");
    let length = await venm.getActiveVendorListLength({from: data.keys.admin.address});
    console.log("length of the vendor",JSON.stringify(length), "\n")

    // Onboard Vendor2
    let keyV2 = data.keys.vendor2;
    await pIntf.assignAccountRole(keyV2.address,"ADMINORG.VENDORS","TRANSACT", {from: data.keys.admin.address});
    await pIntf.assignAccountName(keyV2.address,data.vendor2, {from: data.keys.admin.address})
    let gidVen2 = await venm.registerVendor("test_vendor","test_externalId","test_externalOrgId",data.vendor2, {from: data.keys.admin.address});
    data.gids.ven2Gid = gidVen2.logs[0].args._vendorGid;
    console.log(`Registered vendor ${data.vendor2} ` + keyV2.address);
    console.log(data.gids.ven2Gid);
    console.log(keyV2.privateKey + "\n");
    length = await venm.getActiveVendorListLength({from: data.keys.admin.address});
    console.log("length of the vendor",JSON.stringify(length), "\n")

    //Onboard Bank1
    let keyB1 = data.keys.bank1;
    await pIntf.assignAccountRole(keyB1.address,"ADMINORG.BANKS","TRANSACT", {from: data.keys.admin.address});
    await pIntf.assignAccountName(keyB1.address,data.bank1, {from: data.keys.admin.address});

    let gid1Bank = await bankm.registerBank(crypto.randomBytes(2).toString('hex'), crypto.randomBytes(2).toString('hex'), data.bank1, {from: data.keys.admin.address});
    data.gids.bank1Gid = gid1Bank.logs[0].args._bankGid;
    console.log(`Registered bank ${data.bank1} ` + keyB1.address);
    console.log(data.gids.bank1Gid);

    console.log(keyB1.privateKey + "\n");

    //Onboard Bank2
    let keyB2 = data.keys.bank2;
    await pIntf.assignAccountRole(keyB2.address,"ADMINORG.BANKS","TRANSACT", {from: data.keys.admin.address});
    await pIntf.assignAccountName(keyB2.address,data.bank2, {from: data.keys.admin.address});

    let gid2Bank = await bankm.registerBank(crypto.randomBytes(2).toString('hex'), crypto.randomBytes(2).toString('hex'), data.bank2, {from: data.keys.admin.address});
    data.gids.bank2Gid = gid2Bank.logs[0].args._bankGid;
    console.log(`Registered bank ${data.bank2} ` + keyB2.address);
    console.log(data.gids.bank2Gid);

    console.log(keyB2.privateKey + "\n");

    await editData(data);

    // publishBankGuarantee({"uid":"0x00000000","bankGid":"MMNR83HM","paymentAdviceNumber":"45","paymentAdviceUid":'0xcd49d8b00ef078fd',"referenceNumber":"sad","branchName":"3","bankRepresentativeName":"0x","issuanceDate":"0x","validityPeriod":"0x","claimExpiryDate":"0x00000000000000000000000000000000000000000000000000000000000000ff","validFrom":"0x","validTill":"0x","amount":"0x00000000000000000000000000000000000000000000000000000000000000ff","beneficiaryName":"0x","fileHash":"3","bankEncryptedKey":"3","egpEncryptedKey":"3","vendorEncryptedKey":"3","version":""})

    callback();
};