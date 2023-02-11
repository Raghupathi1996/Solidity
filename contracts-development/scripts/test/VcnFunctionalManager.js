const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');
// const VendorManager = artifacts.require('VendorManager');

const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {

    const data = JSON.parse(fs.readFileSync('./scripts/test/data_copy.json'))
    console.log("HI1");

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
    console.log("HI2");

    VcnFunctionalManager.setProvider(provider);
    // VendorManager.setProvider(provider);

    let vcnManager = await VcnFunctionalManager.deployed();
    console.log("HI41");
    // let venm = await VendorManager.deployed()
    // await vcnManager.modifycurrency("EURO","EUR", {from: data.keys.admin.address});
    // await vcnManager.setCurrency("EURO", {from: data.keys.admin.address});
    // await vcnManager.deleteCurrency("YN", {from: data.keys.admin.address});
    // await vcnManager.setCurrency("USD", {from: data.keys.admin.address});
    // await vcnManager.setCurrency("INR", {from: data.keys.admin.address});
    await vcnManager.setCurrency("INR", {from: data.keys.admin.address}).then(receipt => {
      console.log("HI");
      console.log(JSON.stringify(receipt));
    }).catch(error => {
      console.log(error);
    })
    // let exists = await vcnManager.isCurrencyExists("DOLLAR", {from: data.keys.admin.address});
    // console.log("currency exists",exists,"\n");
    // // console.log("HI41");
    // let checkCurrencyVersion = await vcnManager.checkCurrencyVersion("YUB", "YUB", {from: data.keys.admin.address});
    // console.log("checkCurrencyVersion", checkCurrencyVersion, "\n");


    // try {
    // await vcnManager.setCurrency("Rup4", {from: data.keys.admin.address});
    // } catch (error){
    //   console.log("error:", error);
    // }
    // await vcnManager.setCurrency("Rupees", {from: data.keys.vendor1.address});
    console.log("HI4");
    // let resCurrencyVersion = await vcnManager.getLatestCurrencyVersion("DOL");
    // console.log("getLatestCurrencyVersion:", resCurrencyVersion, "\n");
    // let resCurrencyList = await vcnManager.getCurrencyList(); 
    // console.log("Before merge V2 has " + JSON.stringify(resCurrencyList)+ "\n");

    // let resCurrencyVersion = await vcnManager.getAllCurrencyVersion("YN"); 
    // console.log("Before merge V2 has " + JSON.stringify(resCurrencyVersion)+ "\n");

        
    // let resPreMerge = await aocManager.getAwardOfContractsForVendor(data.gids.ven2Gid, 1000,1000);
    // console.log("Before merge V2 has " + resPreMerge.awardOfContracts_.length + " AOC\n")

    // let gidVen1 = await venm.getGidForVendor(data.vendor1)
    // let gidVen2 = await venm.getGidForVendor(data.vendor2)
    // await  venm.initiateGidMerge(gidVen1,gidVen2, {from: data.keys.vendor1.address});
    // console.log("Initiated GID Merge Request\n");

    // await venm.submitGidMerge(gidVen1,gidVen2,true, {from: data.keys.vendor2.address});
    // console.log("Submitted GID Merge Request\n")

    // await venm.approveGidMerge(data.gids.ven1Gid,data.gids.ven2Gid,true, {from: data.keys.admin.address})
    // console.log("Approved GID Merge Request\n")
    
    // let resPostMerge = await aocManager.getAwardOfContractsForVendor(data.gids.ven2Gid, 1000,1000);
    // console.log("After merge V2 has " + resPostMerge.awardOfContracts_.length + " AOC\n")

    editData(data);
    // console.log(JSON.parse(fs.readFileSync('./scripts/test/data.json')));

    callback();
}