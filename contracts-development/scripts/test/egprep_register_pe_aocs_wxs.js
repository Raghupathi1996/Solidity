const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const VendorManager = artifacts.require('VendorManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');


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

    ProcuringEntityManager.setProvider(provider);
    AwardOfContractManager.setProvider(provider);
    VendorManager.setProvider(provider);
    WorkExperienceManager.setProvider(provider);

    let procm = await ProcuringEntityManager.deployed();
    let aocm = await AwardOfContractManager.deployed()
    let venm = await VendorManager.deployed()
    let wxm = await WorkExperienceManager.deployed()


    console.log("Registring PE for eGP 1");
    let gidProc = await procm.registerProcuringEntity("State1 Water Board" + Math.random().toString(),"test_externalId" + Math.random().toString(),`ADMINORG.${data.egp.egp_1}`, 
    {from: data.keys.egpKeys.egp_1.address});
    // console.log(gidProc);
    data.gids.pe1Gid_egp_1 = gidProc.logs[0].args._peGid;
    // console.log(data.gids.pe1Gid_egp_1);
    console.log("Registered Procuring Entity with GID:" + data.gids.pe1Gid_egp_1 + "\n")
    
    // let gidVen1 = await venm.getGidForVendor(data.vendor.vendor1)
    // let gidVen2 = await venm.getGidForVendor(data.vendor.vendor2)
    // for( const [key, value] of Object.entries(data.gids.vendorGid)) {
    //     console.log("AOC for Vendor", value);
    //     // for( var i=0; i<100; i++) {
    //       let aoc1v1 = await aocm.publishAwardOfContract({
    //       "uid":"0x00000000000",
    //       "vendorGid":value,
    //       "vendorName":"test_vendorName",
    //       "tenderReference":"key1",
    //       "awardReference":`awardReference${i}`,
    //       "title":"test_title6",
    //       "aocStatus":0,
    //       "contractAwardValue":"1000000",
    //       "lotName":["test_lotName"],
    //       "awardOfContractDate":123456,
    //       "procuringEntityGid":data.gids.pe1Gid_egp_1,
    //       "procuringEntityName":"test_procuringEntityName1",
    //       "remarks":"test_remarks",
    //       "awardOfContractLink":"test_awardOfContractLink",
    //       "orgId":`ADMINORG.${data.egp.egp_1}`,
    //       version:""}, 
    //       {from: data.keys.egpKeys.egp_1.address});
    //       console.log(aoc1v1);
    //     // }
    // }
    // let aoc1v1 = await aocm.publishAwardOfContract({
    //   "uid":"0x00000000000",
    //   "vendorGid":data.gids.vendorGid.vendor1,
    //   "vendorName":"test_vendorName",
    //   "tenderReference":"key1",
    //   "awardReference":"test_awardReference3",
    //   "title":"test_title6",
    //   "aocStatus":0,
    //   "contractAwardValue":"1000000",
    //   "lotName":["test_lotName"],
    //   "awardOfContractDate":123456,
    //   "procuringEntityGid":data.gids.pe1Gid_egp_1,
    //   "procuringEntityName":"test_procuringEntityName1",
    //   "remarks":"test_remarks",
    //   "awardOfContractLink":"test_awardOfContractLink",
    //   "orgId":`ADMINORG.${data.egp.egp_1}`,
    //   version:""}, 
    //   {from: data.keys.egpKeys.egp_1.address});
    // console.log(aoc1v1);
    // let aoc1v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"test_vendorName","tenderReference":"test_tenderReference14","awardReference":"test_awardReference3","title":"test_title3","aocStatus":0,"contractAwardValue":"1000000","lotName":["test_lotName"],"awardOfContractDate":12,"procuringEntityGid":data.gids.pe1Gid_egp_1,"procuringEntityName":"test_procuringEntityName1","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.epg.egp_1}`,version:""}, {from: data.keys.egp.address})
    // console.log("test\n");
    // let aoc2v1 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen1,"vendorName":"test_vendorName10","tenderReference":"test_tenderReference13","awardReference":"test_awardReference4","title":"test_title4","aocStatus":0,"contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":12,"procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName2","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // console.log("test\n");
    // let aoc1v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title1","aocStatus":0,"contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":12,"procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // let aoc2v2 = await aocm.publishAwardOfContract({"uid":"0x00000000","vendorGid":gidVen2,"vendorName":"test_vendorName","tenderReference":"test_tenderReference","awardReference":"test_awardReference","title":"test_title2","aocStatus":0,"contractAwardValue":"test_contractAwardValue","lotName":["test_lotName"],"awardOfContractDate":12,"procuringEntityGid":data.gids.peGid,"procuringEntityName":"test_procuringEntityName","remarks":"test_remarks","awardOfContractLink":"test_awardOfContractLink","orgId":`ADMINORG.${data.egp}`,version:""}, {from: data.keys.egp.address})
    // console.log(aoc1v1);
    // aoc1v1 = aoc1v1.logs[0].args._aocUid;
    // aoc2v1 = aoc2v1.logs[0].args._aocUid;
    // aoc1v2 = aoc1v2.logs[0].args._aocUid;
    // aoc2v2 = aoc2v2.logs[0].args._aocUid;
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