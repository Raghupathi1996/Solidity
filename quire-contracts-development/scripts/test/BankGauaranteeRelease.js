const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');


const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');



const editData = (newData) => {
    path = './scripts/test/data_copy.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
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

    BankGuaranteeReleaseManager.setProvider(provider);

    let bgRelease = await BankGuaranteeReleaseManager.deployed();

    console.log("start");
    i=100;
    while(i<2100)
    {
      console.log(i);
      
      let bgRelease1bank1pa1V1 = 
      await bgRelease.publishBankGuaranteeRelease({
          "uid":"0x00000000", 
          "bankGuaranteeUid": data.uids.bg1bank1pa1V1,
          "paymentReference": "PA1",
          "procuringEntityGid": data.gids.pe1Gid_egp_1,
          "egpSystemId":`ADMINORG.${data.egp.egp_1}`,
          "vendorGid": data.gids.vendorGid.vendor1, 
          "bankGid":data.gids.bank1Gid, 
          "branchName": "test_branchName",
          "releaseDate": 2345, 
          "currency": "INR", 
          "amountReleased": i, 
          "bgReleaseFileHash": "23454931", 
          version:1}, {from: data.keys.egpKeys.egp_1.address}
      );

      console.log(bgRelease1bank1pa1V1);
      console.log(bgRelease1bank1pa1V1.logs[0]);
      i+=100;
    }
    // bgRelease1bank1pa1V1 = bgRelease1bank1pa1V1.logs[0].args._bgReleaseUid;
    // data.uids.bgRelease1bank1pa1V1 = bgRelease1bank1pa1V1;
    // editData(data);

    // // publishBankGuaranteeInvoke
    // let bgInvoke1bank1pa1V1 = 
    // await bgRelease.publishBankGuaranteeInvoke({
    //     "uid":"0x00000000", 
    //     "bankGuaranteeUid": data.uids.bg1bank1pa1V1,
    //     "paymentReference": "PA03",
    //     "procuringEntityGid": data.gids.peGid,
    //     "egpSystemId":`ADMINORG.${data.egp}`,
    //     "vendorGid": data.gids.ven1Gid, 
    //     "bankGid":data.gids.bank1Gid, 
    //     "branchName": "test_branchName",
    //     "revocationDate": 2345, 
    //     "currency": "INR", 
    //     "revocationAmount": 200,
    //     "beneficiaryName": "Raghupathi",
    //     "beneficiaryBankAccountNumber": "12345467890",
    //     "beneficiaryBankName":"SBI",
    //     "beneficiaryBranchName":"Akshaya",
    //     "beneficiaryIfscCode":"ABC",
    //     "bgInvokeFileHash": "23454931", 
    //     version:1}, {from: data.keys.egp.address}
    // );

    // console.log(bgInvoke1bank1pa1V1);
    // console.log(bgInvoke1bank1pa1V1.logs[0]);
    // // bgInvoke1bank1pa1V1 = bgInvoke1bank1pa1V1.logs[0].args._bgReleaseUid;
    // // data.uids.bgInvoke1bank1pa1V1 = bgInvoke1bank1pa1V1;

    // let bgRelease2bank1pa1V1 = 
    // await bgRelease.publishBankGuaranteeRelease({
    //     "uid":"0x00000000", 
    //     "bankGuaranteeUid": data.uids.bg1bank1pa1V1,
    //     "paymentReference": "PA03",
    //     "procuringEntityGid": data.gids.peGid,
    //     "egpSystemId":`ADMINORG.${data.egp}`,
    //     "vendorGid": data.gids.ven1Gid, 
    //     "bankGid":data.gids.bank1Gid, 
    //     "branchName": "test_branchName",
    //     "releaseDate": 2345, 
    //     "currency": "INR", 
    //     "amountReleased": 300, 
    //     "bgReleaseFileHash": "23454931", 
    //     version:1}, {from: data.keys.egp.address}
    // );

    // console.log(bgRelease2bank1pa1V1);
    // console.log(bgRelease2bank1pa1V1.logs[0]);

    // let bgInvoke2bank1pa1V1 = 
    // await bgRelease.publishBankGuaranteeInvoke({
    //     "uid":"0x00000000", 
    //     "bankGuaranteeUid": data.uids.bg1bank1pa1V1,
    //     "paymentReference": "PA03",
    //     "procuringEntityGid": data.gids.peGid,
    //     "egpSystemId":`ADMINORG.${data.egp}`,
    //     "vendorGid": data.gids.ven1Gid, 
    //     "bankGid":data.gids.bank1Gid, 
    //     "branchName": "test_branchName",
    //     "revocationDate": 2345, 
    //     "currency": "INR", 
    //     "revocationAmount": 400,
    //     "beneficiaryName": "Raghupathi",
    //     "beneficiaryBankAccountNumber": "12345467890",
    //     "beneficiaryBankName":"SBI",
    //     "beneficiaryBranchName":"Akshaya",
    //     "beneficiaryIfscCode":"ABC",
    //     "bgInvokeFileHash": "23454931", 
    //     version:1}, {from: data.keys.egp.address}
    // );

    // console.log(bgInvoke2bank1pa1V1);
    // console.log(bgInvoke2bank1pa1V1.logs[0]);

    // let bgInvoke3bank1pa1V1 = 
    // await bgRelease.publishBankGuaranteeInvoke({
    //     "uid":"0x00000000", 
    //     "bankGuaranteeUid": "0x8d41a6c99d0a626c",
    //     "paymentReference": "PA1",
    //     "procuringEntityGid": data.gids.pe1Gid_egp_1,
    //     "egpSystemId":`ADMINORG.${data.egp.egp_1}`,
    //     "vendorGid": data.gids.vendorGid.vendor1, 
    //     "bankGid":data.gids.bank1Gid, 
    //     "branchName": "test_branchName",
    //     "revocationDate": 2345, 
    //     "currency": "INR", 
    //     "revocationAmount": 300,
    //     "beneficiaryName": "Raghupathi",
    //     "beneficiaryBankAccountNumber": "12345467890",
    //     "beneficiaryBankName":"SBI",
    //     "beneficiaryBranchName":"Akshaya",
    //     "beneficiaryIfscCode":"ABC",
    //     "bgInvokeFileHash": "23454931", 
    //     version:1}, {from: data.keys.egpKeys.egp_1.address}
    // );

    // console.log(bgInvoke3bank1pa1V1);
    // console.log(bgInvoke3bank1pa1V1.logs[0]);

    callback();
};
// gitignore test

