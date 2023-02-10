const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');


const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

    const provider = new HDWalletProvider({
      privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank.privateKey],
      providerOrUrl: "http://127.0.0.1:22000/",
      chainId: 10
    });
    console.log("HI");


    PaymentAdviceManager.setProvider(provider);
    BankGuaranteeManager.setProvider(provider);
    BankGuaranteeReleaseManager.setProvider(provider);

    let payadm = await PaymentAdviceManager.deployed();
    let bgm = await BankGuaranteeManager.deployed()
    let bgrm = await BankGuaranteeReleaseManager.deployed()
    console.log("HI");
    let uidPA1 = await payadm.registerPaymentAdvice({
      "uid":"0x00000001",
      "egpSystemId":`ADMINORG.${data.egp}`,
      "paymentType":1,
      "paymentAdviceReferenceNumber":"test_paymentAdviceReferenceNumber",
      "validityPeriodDays":512,
      "bankGuaranteeClaimExpiryDate":1662814931,
      "currency":"INR",
      "bankGuaranteeAmount":000001200,
      "vendorGid":data.gids.ven1Gid,
      "vendorName":"test_vendorName",
      "procuringEntityGid":data.gids.peGid,
      "procuringEntityName":"test_procuringEntityName",
      "amendment":0,
      // "version":"test_awardOfContractLink",
      // "orgId":`ADMINORG.${data.egp}`,
      version:1},
      {from: data.keys.egp.address});
      console.log(uidPA1)

      amendedPaymentAdvice

      let uidAmend_PA1 = await payadm.amendedPaymentAdvice({
        "uid":"0x00000001",
        "egpSystemId":`ADMINORG.${data.egp}`,
        "paymentType":1,
        "paymentAdviceReferenceNumber":"test_paymentAdviceReferenceNumber",
        "validityPeriodDays":512,
        "bankGuaranteeClaimExpiryDate":1662814931,
        "currency":"INR",
        "bankGuaranteeAmount":000001210,
        "vendorGid":data.gids.ven1Gid,
        "vendorName":"test_vendorName",
        "procuringEntityGid":data.gids.peGid,
        "procuringEntityName":"test_procuringEntityName",
        "amendment":0,
        // "version":"test_awardOfContractLink",
        // "orgId":`ADMINORG.${data.egp}`,
        version:1},
        {from: data.keys.egp.address});
        console.log(uidAmend_PA1)

    // let uidPA1 = await payadm.registerPaymentAdvice({"uid":"0x00000000","egpSystemId":gidVen1,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc1v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":"test_awardOfContractDate","procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    
  
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