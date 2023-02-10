const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');


const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const BankGuaranteeInvokeModel = artifacts.require('BankGuaranteeInvokeModel');
const BankGuaranteeReleaseModel = artifacts.require('BankGuaranteeReleaseModel');



const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

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
    BankGuaranteeInvokeModel.setProvider(provider);
    BankGuaranteeReleaseModel.setProvider(provider);

    let bgRelease = await BankGuaranteeReleaseManager.deployed();
    let bgInvokeModel = await BankGuaranteeInvokeModel.deployed();
    let bgReleaseModel = await BankGuaranteeReleaseModel.deployed();

    console.log("start");
    console.log("1")

    let bgRelease1bank1pa1V1 = await bgRelease.getBgReleasesAndInvokesListByPaBankGid("PA1",data.gids.bank1Gid, 30, 20);
      // let bgInvokeModelReturn = await bgInvokeModel.getBankGuaranteeInvokeByIndex(arr[i]-1);
    console.log(bgRelease1bank1pa1V1);
    // console.log(JSON.stringify(bgRelease1bank1pa1V1));
    // console.log(JSON.stringify(bgRelease1bank1pa1V1.mapReport));
      // console.log(bgInvokeModelReturn);
    // let bgReleaseModelReturn = await bgReleaseModel.getBankGuaranteeReleaseByIndex(c);
    // console.log(bgReleaseModelReturn);
    // console.log(JSON.stringify(bgRelease1bank1pa1V1.indexList));
    // console.log(JSON.stringify(bgRelease1bank1pa1V1.mapReport));
    // let bgReleaseModelReturn = await bgReleaseModel.getReleaseInvokeStatus
    // console.log(JSON.stringify(bgRelease1bank1pa1V1.indexList));
    // console.log(JSON.stringify(bgRelease1bank1pa1V1));
    // console.log(JSON.stringify(bgRelease1bank1pa1V1.indexList));
    // bgRelease1bank1pa1V1 = bgRelease1bank1pa1V1.logs[0].args._bgReleaseUid;
    // data.uids.bgRelease1bank1pa1V1 = bgRelease1bank1pa1V1;
    // editData(data);

    callback();
};
// gitignore test

