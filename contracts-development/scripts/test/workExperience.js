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


    WorkExperienceManager.setProvider(provider);

    
    let wxm = await WorkExperienceManager.deployed()


    let wx1aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address})
    let wx1aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v1,version:""}, {from: data.keys.egp.address})
    let wx1aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v2,version:""}, {from: data.keys.egp.address})
    let wx1aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar1",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v2,version:""}, {from: data.keys.egp.address})
    let wx2aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address})
    let wx2aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v1,version:""}, {from: data.keys.egp.address})
    let wx2aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v2,version:""}, {from: data.keys.egp.address})
    let wx2aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar2",contractCompletedValue:"ccv1",workExperienceCertificateIssuanceDate:"wecid1",workStatus:1,supplierRating:1,remarks:"r1",workExperienceFileHash:"wefl1",procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v2,version:""}, {from: data.keys.egp.address})
    wx1aoc1v1 = wx1aoc1v1.logs[0].args.uid;
    wx1aoc2v1 = wx1aoc2v1.logs[0].args.uid;
    wx1aoc1v2 = wx1aoc1v2.logs[0].args.uid;
    wx1aoc2v2 = wx1aoc2v2.logs[0].args.uid;
    wx2aoc1v1 = wx2aoc1v1.logs[0].args.uid;
    wx2aoc2v1 = wx2aoc2v1.logs[0].args.uid;
    wx2aoc1v2 = wx2aoc1v2.logs[0].args.uid;
    wx2aoc2v2 = wx2aoc2v2.logs[0].args.uid;
    data.uids.wx1aoc1v1 = wx1aoc1v1;
    data.uids.wx1aoc2v1 = wx1aoc2v1;
    data.uids.wx1aoc1v2 = wx1aoc1v2;
    data.uids.wx1aoc2v2 = wx1aoc2v2;
    data.uids.wx2aoc1v1 = wx2aoc1v1;
    data.uids.wx2aoc2v1 = wx2aoc2v1;
    data.uids.wx2aoc1v2 = wx2aoc1v2;
    data.uids.wx2aoc2v2 = wx2aoc2v2;
    console.log("Registered WXs");
    console.log(`Vendor 1: ${aoc1v1}: ${wx1aoc1v1} ${wx2aoc1v1}`);
    console.log(`Vendor 1: ${aoc2v1}: ${wx1aoc2v1} ${wx2aoc2v1}`);
    console.log(`Vendor 2: ${aoc1v2}: ${wx1aoc1v2} ${wx2aoc1v2}`);
    console.log(`Vendor 2: ${aoc2v2}: ${wx1aoc2v2} ${wx2aoc2v2}`);

    editData(data);

    // await paymentAdviceManager.registerPaymentAdvice({uid:"0x00000000",egpSystemId:"ADMINORG.EGP_a8af",paymentType:0,paymentAdviceReferenceNumber:"xx",validityPeriodDays:0,bankGuaranteeClaimExpiryDate:"0x00000000000000000000000000000000000000000000000000000000000000ff",bankGuaranteeAmount:"0x00000000000000000000000000000000000000000000000000000000000000ff",vendorGid:"1UVKHLI9",vendorName:"",procuringEntityGid:"6FNPS45A",procuringEntityName:"",amendment:0,version:0})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeRelease({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_payment_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',releaseDate:'255',amountReleased:'4',bgReleaseFileHash:'',version:''})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};