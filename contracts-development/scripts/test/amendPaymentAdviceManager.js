const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const PaymentAdviceModel = artifacts.require('PaymentAdviceModel');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
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
    console.log("HI");

    PaymentAdviceManager.setProvider(provider);
    PaymentAdviceModel.setProvider(provider);
    BankGuaranteeManager.setProvider(provider);
    BankGuaranteeReleaseManager.setProvider(provider);

    let payadm = await PaymentAdviceManager.deployed();
    let payadmodel = await PaymentAdviceModel.deployed();
    let bgm = await BankGuaranteeManager.deployed()
    let bgrm = await BankGuaranteeReleaseManager.deployed()
    console.log("HI");
    // let uidPA1 = await payadm.registerPaymentAdvice({
    //   "uid":"0x00000001",
    //   "egpSystemId":`ADMINORG.${data.egp}`,
    //   "paymentType":1,
    //   "paymentAdviceReferenceNumber":"PA01",
    //   "validityPeriodDays":512,
    //   "bankGuaranteeClaimExpiryDate":"1662814931",
    //   "currency":"INR",
    //   "bankGuaranteeAmount":10200,
    //   "vendorGid":data.gids.ven1Gid,
    //   "vendorName":"test_vendorName",
    //   "procuringEntityGid":data.gids.peGid,
    //   "procuringEntityName":"test_procuringEntityName",
    //   "amendment":0,
    //   "formStatus":1,
    //   // "version":"test_awardOfContractLink",
    //   // "orgId":`ADMINORG.${data.egp}`,
    //   version:1},
    //   {from: data.keys.egp.address}).then(receipt => {console.log("HI"); console.log(receipt.events);}).catch(error => {console.log(error)});

    //   console.log(uidPA1.logs[0])

    let uidAmend_PA1 = await payadm.registerPaymentAdvice({
      "uid":"0x0000000000000000",
      "egpSystemId":`ADMINORG.${data.egp.egp_1}`, 
      "paymentType":0, 
      "paymentAdviceReferenceNumber":"PA1", 
      "validityPeriodDays":512,
      "bankGuaranteeClaimExpiryDate": "16652814931", 
      "currency":"INR", 
      "bankGuaranteeAmount":80000033,
      "vendorGid":data.gids.vendorGid.vendor1, 
      "vendorName":"Raghu1",
      "procuringEntityGid":data.gids.pe1Gid_egp_1, 
      "procuringEntityName":"Food-Department", 
      "amendment":1,
      "formStatus":1,
      version:1}, {from: data.keys.egpKeys.egp_1.address});
        // .then(receipt => {console.log("HI!!!!!!!!"); console.log(receipt.logd[0]); console.log(receipt.events)}).catch(error => {console.log(error)});
      console.log(uidAmend_PA1.logs[0])
      console.log(JSON.stringify(uidAmend_PA1.logs[0].args._paUid))
      // console.log(JSON.stringify(uidAmend_PA1.logs[0]))

      data.uids.pa1V1 = uidAmend_PA1.logs[0].args._paUid;
      // console.log(data.uids.pa1V1);




    let paIndex = await payadmodel.getPaymentAdviceIndex(data.uids.pa1V1);
    console.log(paIndex);
    // let paIndex = '10';
    console.log(JSON.stringify(paIndex));
    // console.log(typeof(paIndex));

    let pa = await payadmodel.getPaymentAdviceByIndex(paIndex-1);
    console.log(pa);

    // let paLen = await payadmodel.getPaymentAdviceListLength();
    // console.log(paLen);
    // console.log(JSON.stringify(paLen));


    // let uidPA1 = await payadm.getPaymentAdviceListByPaymentAdviceRefAndEgpIdTest("PA20", `ADMINORG.${data.egp.egp_1}`, 20, 20);
    // console.log(uidPA1);
    // console.log(JSON.stringify(uidPA1.indexList));
    // // let aoc1v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    
  
    // let gidVen1 = await venm.getGidForVendor(data.vendor1)
    // let gidVen2 = await venm.getGidForVendor(data.vendor2)
    // let aoc1v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","egpSystemId":"test_egpSystemId","paymentType":"test_vendorName","paymentAdviceReferenceNumber":"test_tenderReference","validityPeriodDays":"test_awardReference","bankGuaranteeClaimExpiryDate":"test_title1","currency":"test_contractAwardValue","bankGuaranteeAmount":["test_lotName"],"vendorGid":"test_awardOfContractDate","vendorName":data.gids.peGid,"procuringEntityGid":"test_procuringEntityName","procuringEntityName":"test_procuringEntityName","amendment":"test_remarks","version":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc2v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title2","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc1v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc2v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title2","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // aoc1v1 = aoc1v1.logs[0].args.uid;
    // aoc2v1 = aoc2v1.logs[0].args.uid;
    // aoc1v2 = aoc1v2.logs[0].args.uid;
    // aoc2v2 = aoc2v2.logs[0].args.uid;
    // data.uids.aoc1v1 = aoc1v1;
    // data.uids.aoc2v1 = aoc2v1;
    // data.uids.aoc1v2 = aoc1v2;
    // data.uids.aoc2v2 = aoc2v2;

    // console.log("Registered AOCs");
    // console.log("Vendor 1: " + aoc1v1 + " " + aoc2v1);
    // console.log("Vendor 2: " + aoc1v2 + " " + aoc2v2 + "\n");

    // let wx1aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc1v1,version:""}, {from: data.keys.egp.address})
    // let wx1aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc2v1,version:""}, {from: data.keys.egp.address})
    // let wx1aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc1v2,version:""}, {from: data.keys.egp.address})
    // let wx1aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc2v2,version:""}, {from: data.keys.egp.address})
    // let wx2aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc1v1,version:""}, {from: data.keys.egp.address})
    // let wx2aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc2v1,version:""}, {from: data.keys.egp.address})
    // let wx2aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc1v2,version:""}, {from: data.keys.egp.address})
    // let wx2aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:aoc2v2,version:""}, {from: data.keys.egp.address})
    // wx1aoc1v1 = wx1aoc1v1.logs[0].args.uid;
    // wx1aoc2v1 = wx1aoc2v1.logs[0].args.uid;
    // wx1aoc1v2 = wx1aoc1v2.logs[0].args.uid;
    // wx1aoc2v2 = wx1aoc2v2.logs[0].args.uid;
    // wx2aoc1v1 = wx2aoc1v1.logs[0].args.uid;
    // wx2aoc2v1 = wx2aoc2v1.logs[0].args.uid;
    // wx2aoc1v2 = wx2aoc1v2.logs[0].args.uid;
    // wx2aoc2v2 = wx2aoc2v2.logs[0].args.uid;
    // data.uids.wx1aoc1v1 = wx1aoc1v1;
    // data.uids.wx1aoc2v1 = wx1aoc2v1;
    // data.uids.wx1aoc1v2 = wx1aoc1v2;
    // data.uids.wx1aoc2v2 = wx1aoc2v2;
    // data.uids.wx2aoc1v1 = wx2aoc1v1;
    // data.uids.wx2aoc2v1 = wx2aoc2v1;
    // data.uids.wx2aoc1v2 = wx2aoc1v2;
    // data.uids.wx2aoc2v2 = wx2aoc2v2;
    // console.log("Registered WXs");
    // console.log(`Vendor 1: ${aoc1v1}: ${wx1aoc1v1} ${wx2aoc1v1}`);
    // console.log(`Vendor 1: ${aoc2v1}: ${wx1aoc2v1} ${wx2aoc2v1}`);
    // console.log(`Vendor 2: ${aoc1v2}: ${wx1aoc1v2} ${wx2aoc1v2}`);
    // console.log(`Vendor 2: ${aoc2v2}: ${wx1aoc2v2} ${wx2aoc2v2}`);

    editData(data);

    // await paymentAdviceManager.registerPaymentAdvice({uid:"0x00000000",egpSystemId:"ADMINORG.EGP_a8af",paymentType:0,paymentAdviceReferenceNumber:"xx",validityPeriodDays:0,bankGuaranteeClaimExpiryDate:"0x00000000000000000000000000000000000000000000000000000000000000ff",bankGuaranteeAmount:"0x00000000000000000000000000000000000000000000000000000000000000ff",vendorGid:"1UVKHLI9",vendorName:"",procuringEntityGid:"6FNPS45A",procuringEntityName:"",amendment:0,version:0})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeRelease({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_payment_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',releaseDate:'255',amountReleased:'4',bgReleaseFileHash:'',version:''})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};