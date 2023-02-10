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

    i = 2100;

    while(i<4100)
    {
        console.log(i);

    let bgR1bank1pa1V1 = await bgRelease.publishBankGuaranteeInvoke({
        "uid":"0x00000000", 
        "bankGuaranteeUid": data.uids.bg1bank1pa1V1,
        "paymentReference": "PA1",
        "procuringEntityGid": data.gids.pe1Gid_egp_1,
        "egpSystemId":`ADMINORG.${data.egp.egp_1}`,
        "vendorGid": data.gids.vendorGid.vendor1, 
        "bankGid":data.gids.bank1Gid, 
        "branchName": "1662814931",
        "revocationDate": 1001, 
        "currency":"INR",
        "revocationAmount": i, 
        "beneficiaryName": "1662814931", 
        "beneficiaryBankAccountNumber": "1662814931",
        "beneficiaryBankName":"INR", 
        "beneficiaryBranchName": "as",
        "beneficiaryIfscCode": "test_fileHash", 
        "bgInvokeFileHash":"dsc",
        version:1}, {from: data.keys.egpKeys.egp_1.address}) .then(
            receipt => { console.log(receipt);}) .catch (error => {console.log(error);})

    console.log(bgR1bank1pa1V1);
    i+=100;
    // console.log(bgR1bank1pa1V1.logs[0]);
    // bgR1bank1pa1V1 = bgR1bank1pa1V1.logs[0].args._bgUid;
    // data.uids.bgR1bank1pa1V1 = bgR1bank1pa1V1;
    // editData(data);
    }

// await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};
// gitignore test

