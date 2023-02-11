const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const VendorManager = artifacts.require('VendorManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');


const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

    const provider = new HDWalletProvider({
      privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank1.privateKey,  data.keys.bank2.privateKey],
      providerOrUrl: "http://127.0.0.1:22000/",
      chainId: 10
    });

    ProcuringEntityManager.setProvider(provider);
    AwardOfContractManager.setProvider(provider);
    VendorManager.setProvider(provider);
    WorkExperienceManager.setProvider(provider);

    let procm = await ProcuringEntityManager.deployed();
    let aocm = await AwardOfContractManager.deployed()
    let venm = await VendorManager.deployed()
    let wxm = await WorkExperienceManager.deployed()


    let gidProc = await procm.registerProcuringEntity("test_name" + Math.random().toString(),"test_externalId" + Math.random().toString(),`ADMINORG.${data.egp}`, {from: data.keys.egp.address});
    console.log(gidProc);
    data.gids.peGid = gidProc.logs[0].args._gid;
    console.log(data.gids);
    console.log("Registered Procuring Entity with GID: " + data.gids.peGid + "\n")
    
    let gidVen1 = await venm.getGidForVendor(data.vendor1)
    // console.log(gidVen1);
    // let gidVen2 = await venm.getGidForVendor(data.vendor2)

    

    let aoc1v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"Srini","tenderReference":"tenderReference102","awardReference":"test_awardReference8","title":"tenderTitle1","aocStatus":1,"contractAwardValue":"1000000","lotName":["lotName"],"awardOfContractDate":"06/19/2022","procuringEntityGid":data.gids.peGid,"procuringEntityName":"Food Department","remarks":"GOOD","awardOfContractLink":"awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"Meghana","tenderReference":"tenderReference49","awardReference":"test_awardReference6","title":"tenderTitle1","aocStatus":0,"contractAwardValue":"1000000","lotName":["lotName"],"awardOfContractDate":"06/19/2022","procuringEntityGid":data.gids.peGid,"procuringEntityName":"Food Department","remarks":"GOOD","awardOfContractLink":"awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address}).then (receipt => {
    //     console.log("HI");
    //     console.log(JSON.stringify(receipt.logs[0].args.status));
    //   }).catch(error => {
    //     console.log(error);
    //   })
    let aoc2v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"Srini","tenderReference":"tenderReference103","awardReference":"test_awardReference9","title":"test_title2","aocStatus":0,"contractAwardValue":"9000000","lotName":["test_lotName"],"awardOfContractDate":"06/05/2022","procuringEntityGid":data.gids.peGid,"procuringEntityName":"Food Department","remarks":"AVG","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc1v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc2v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title2","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // console.log(aoc1v1);
    // console.log(aoc2v1);

    aoc1v1 = aoc1v1.logs[0].args.uid;
    aoc2v1 = aoc2v1.logs[0].args.uid;
    // aoc1v2 = aoc1v2.logs[0].args.uid;
    // aoc2v2 = aoc2v2.logs[0].args.uid;
    data.uids.aoc1v1 = aoc1v1;
    data.uids.aoc2v1 = aoc2v1;
    // data.uids.aoc1v2 = aoc1v2;
    // data.uids.aoc2v2 = aoc2v2;

    console.log("Registered AOCs");
    console.log("Vendor 1: " + aoc1v1 + " " + aoc2v1);
    // console.log("Vendor 2: " + aoc1v2 + " " + aoc2v2 + "\n");
    let getaoc1v1 = await aocm.getAwardOfContract(aoc1v1);
    console.log("getaoc1v1", JSON.stringify(getaoc1v1));
    let getaoc2v1 = await aocm.getAwardOfContract(aoc2v1);
    console.log("getaoc2v1", JSON.stringify(getaoc2v1));
    editData(data);


  // await aocm.updateAocStatustoAwarded({"uid":data.uids.aoc2v1,"vendorGid":gidVen1,"vendorName":"Srini","tenderReference":"test_tenderReference47","awardReference":"test_awardReference3_1","title":"tenderTitle1_1","aocStatus":1,"contractAwardValue":"contractAwardValueTender20","lotName":["lotName"],"awardOfContractDate":"08/19/2022","procuringEntityGid":data.gids.peGid,"procuringEntityName":"Food Department","remarks":"remarks","awardOfContractLink":"awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address}).then (receipt => {
  //   console.log("HI");
  //   console.log(JSON.stringify(receipt.logs[0].args.status));
  // }).catch(error => {
  //   console.log(error);
  // })


  // await aocm.updateAocStatustoCancel(data.uids.aoc2v1, {from: data.keys.egp.address}).then(receipt => {
  //   console.log("HI");
  //   console.log(JSON.stringify(receipt.logs[0].args.status));
  // }).catch(error => {
  //   console.log(error);
  // });


    // let updated_aoc1v1 = await aocm.updateAocStatustoAwarded({"uid":data.uids.aoc1v1,"vendorGid":gidVen1,"vendorName":"Srini","tenderReference":"tenderReference28","awardReference":"test_awardReference3_1","title":"tenderTitle1_1","aocStatus":0,"contractAwardValue":"contractAwardValueTender20","lotName":["lotName"],"awardOfContractDate":"08/19/2022","procuringEntityGid":data.gids.peGid,"procuringEntityName":"Food Department","remarks":"remarks","awardOfContractLink":"awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // // console.log("updated_aoc1v1", updated_aoc1v1);
    // console.log("updated_aoc1v1", updated_aoc1v1.logs[0].args.uid, ".....", JSON.stringify(updated_aoc1v1.logs[0].args.status));

    // // let updated_aoc2v1 = await aocm.updateAocStatustoCancel(aoc2v1, {from: data.keys.egp.address});
    // // console.log("updated_aoc2v1", updated_aoc2v1);

    // let getUpdatedaoc1v1 = await aocm.getAwardOfContract(data.uids.aoc1v1);
    // console.log("getUpdatedaoc1v1",JSON.stringify(getUpdatedaoc1v1));

    // let updated_aoc2v1 = await aocm.updateAocStatustoCancel(data.uids.aoc2v1, {from: data.keys.egp.address});
    // console.log("updated_aoc2v1", updated_aoc2v1.logs[0].args.uid, ".....", JSON.stringify(updated_aoc2v1.logs[0].args.status));

    // let getUpdatedaoc2v1 = await aocm.getAwardOfContract(data.uids.aoc2v1);
    // console.log("getUpdatedaoc2v1",JSON.stringify(getUpdatedaoc2v1));
    // editData(data);

    // await paymentAdviceManager.registerPaymentAdvice({uid:"0x00000000",egpSystemId:"ADMINORG.EGP_a8af",paymentType:0,paymentAdviceReferenceNumber:"xx",validityPeriodDays:0,bankGuaranteeClaimExpiryDate:"0x00000000000000000000000000000000000000000000000000000000000000ff",bankGuaranteeAmount:"0x00000000000000000000000000000000000000000000000000000000000000ff",vendorGid:"1UVKHLI9",vendorName:"",procuringEntityGid:"6FNPS45A",procuringEntityName:"",amendment:0,version:0})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeRelease({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_payment_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',releaseDate:'255',amountReleased:'4',bgReleaseFileHash:'',version:''})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};