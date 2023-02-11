const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const VcnFunctionalModel = artifacts.require('VcnFunctionalModel');
// const VendorManager = artifacts.require('VendorManager');

const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {

    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'))
    console.log("HI1");

    const provider = new HDWalletProvider({
      privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank.privateKey],
      providerOrUrl: "http://127.0.0.1:22000/",
      chainId: 10
    });

    VcnFunctionalModel.setProvider(provider);
    // VendorManager.setProvider(provider);

    let vcnModel = await VcnFunctionalModel.deployed();

    // await vcnModel.setIndexByCurrencyName("DOL",5, {from: data.keys.admin.address});
    // let resgetIndexMember = await vcnModel.getCurrencyNameIndexMember("DOL");
    // console.log("result of getCurrencyNameIndexMember DOL", JSON.stringify(resgetIndexMember));
    let resgetTest = await vcnModel.getAllCurrencyVersionOfIndex("Rup");
    console.log("result of getAllCurrencyVersionOfIndex", JSON.stringify(resgetTest));
    // resgetTest = await vcnModel.getLatestCurrencyOfIndexCurrency("1");
    // console.log("result of getAllCurrencyVersionOfIndex", JSON.stringify(resgetTest));
    // console.log("HI41");
    // await vcnModel.deleteAllCurrecnyVersion("INR", {from: data.keys.admin.address});
    console.log("HI42");
    resgetTest = await vcnModel.getAllCurrencyType();
    console.log("result of getAllCurrencyType", JSON.stringify(resgetTest));
    // resgetTest = await vcnModel.getIndexByCurrencyName("DOL");
    // console.log("result of DOL", JSON.stringify(resgetTest));


    //

    // await vcnModel.deleteIndexByCurrencyName("DOL")
    // console.log("HI51");
    // await vcnModel.addNewVersionCurrencyName("Rup7","Rup71")
    // let latestCurrency = await vcnModel.getLatestCurrencyOfIndexCurrency("Yun");
    // console.log("result of latestCurrecny", latestCurrency);
    // await vcnModel.addCurrencyType("Yun",15)

    // await vcnModel.addCurrencyType("DOL",2)
    
    // await vcnModel.addCurrencyType("DOLLI",3)
    console.log("HI52");
    let latestCurrencyList = await vcnModel.getAllCurrencyType();
    console.log("result of getAllCurrencyType", latestCurrencyList);

    // try {
    // await vcnModel.setCurrency("Rup4", {from: data.keys.admin.address});
    // } catch (error){
    //   console.log("error:", error);
    // }
    // let resCurrencyLength = await vcnModel.getCurrencyListLength();
    // console.log("Length:", resCurrencyLength, "\n");
    // let resCurrencyList = await vcnModel.getCurrencyList();
    // console.log("Before merge V2 has " + JSON.stringify(resCurrencyList)+ " AOC\n");

        
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