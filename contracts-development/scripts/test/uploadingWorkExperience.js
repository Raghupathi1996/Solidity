const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');

const editData = (newData) => {
  path = './scripts/test/data.json';
  if(fs.existsSync(path)) {fs.unlikeSync(path)};
  fs.writeFileSync(path, JSON.stringify(newData));
  return newData;
}

module.exports = async function (callback) {
  const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

  const provider = new HDWalletProvider({
    privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank1.privateKey,  data.keys.bank2.privateKey],
    providerOrUrl: "http://127.0.0.1:22000/",
    chainId: 10
  })

  WorkExperienceManager.setProvider(provider);
  AwardOfContractManager.setProvider(provider);

  let wxm = await WorkExperienceManager.deployed();
  let aoc = await AwardOfContractManager.deployed();

  /**
 * Returns bool of validating the peGid of the aoc and the WE peGid
 * @param {bytes8} data.uids.aoc1v1
 * @param {string} data.gids.peGid
 * @returns {bool}
 */
  // await aoc.isProcuringEntityGidForAocUid(data.uids.aoc1v1,data.gids.peGid).then(receipt => {
  //   console.log("HI");
  //   console.log(JSON.stringify(receipt));
  // }).catch(error => {
  //   console.log(error);
  // })

  /**
   * Returns recipt of uploading the work experience
   * @param {Work experience object}
   * @returns {receipt with the events}
   */


  // await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar7",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address}).then(receipt => {
  //   console.log("HI");
  //   console.log(JSON.stringify(receipt.logs[0].args.uid));
  // }).catch(error => {
  //   console.log(error);
  // })

  console.log("start");
  let wx1aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar15",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address})
  console.log("2nd");
  let wx1aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar13",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v1,version:""}, {from: data.keys.egp.address})
  console.log("3rd");
  let wx1aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar13",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v2,version:""}, {from: data.keys.egp.address})
  console.log("4th");
  let wx1aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar13",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v2,version:""}, {from: data.keys.egp.address})
  console.log("5th");
  let wx2aoc1v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar14",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address})
  console.log("6th");
  let wx2aoc2v1 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar14",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v1,version:""}, {from: data.keys.egp.address})
  console.log("7th");
  let wx2aoc1v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar14",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v2,version:""}, {from: data.keys.egp.address})
  console.log("8th");
  let wx2aoc2v2 = await wxm.addWorkExperience({uid:'0x00000000',awardReference:"ar14",workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc2v2,version:""}, {from: data.keys.egp.address})
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

  callback();
}