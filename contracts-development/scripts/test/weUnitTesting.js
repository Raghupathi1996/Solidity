const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const WorkExperienceModel = artifacts.require('WorkExperienceModel');

const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlikeSync(path)};
    fs.writeFileSunc(path, JSON.stringify(newData));
}

// const weReceipt = () => {
//     path = './scripts/test/weReceipt.json';
//     if(fs.existsSync(path)) {fs.unlinkSync(path)}

//     for(let i = 43; i<60; i++) {
//         let testVarible = `ar13${i}`;
//         console.log(testVarible);
//         let wx1aoc1v1 = await wxmanager.addWorkExperience({uid:'0x00000000',awardReference:`ar13${i}`,workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address});
//         // wx1aoc1v1 = wx1aoc1v1.logs[0].args.uid;
//         // data.uids.wx1aoc1v1 = wx1aoc1v1;
//         console.log(wx1aoc1v1);
//         console.log(i+1);
//         fs.appendFile(path, JSON.stringify(wx1aoc1v1));
        
//     }
// }

module.exports = async function (callback) {
    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));
    path = './scripts/test/weReceipt.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
  
    const provider = new HDWalletProvider({
      privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank1.privateKey,  data.keys.bank2.privateKey],
      providerOrUrl: "http://127.0.0.1:22000/",
      chainId: 10
    })

    WorkExperienceManager.setProvider(provider);
    WorkExperienceModel.setProvider(provider);

    let wxmanager = await WorkExperienceManager.deployed();
    let wxmodel = await WorkExperienceModel.deployed();

/**
 * Returns list of indexs of the workexperience, fromInclude and length 
 * @notice 
 * @param {bytes8} data.uids.aoc1v1
 * @param {uint} 1
 * @param {uint} 1
 * @returns {WorkExperience, integer, integer}
 */
    console.log("start");

    // for(let i = 10; i<30; i++) {
    //     let testVarible = `ar13${i}`;
    //     console.log(testVarible);
    //     let wx1aoc1v1 = await wxmanager.addWorkExperience({uid:'0x00000000',awardReference:`ar13${i}`,workExperienceCertificateIssuanceDate:"wecid1",contractCompletedValue:"ccv1",workStatus:1,remarks:"r1",supplierRating:1,workExperienceFileHash:"wefl1",egpSystemId:`ADMINORG.${data.egp}`,procuringEntityGid:data.gids.peGid,procuringEntityName:"",procuringEntityRepresentativeName:"",procuringEntityRepresentativeDesignation:"",subject:"",awardOfContractId:data.uids.aoc1v1,version:""}, {from: data.keys.egp.address});
    //     // wx1aoc1v1 = wx1aoc1v1.logs[0].args.uid;
    //     // data.uids.wx1aoc1v1 = wx1aoc1v1;
    //     console.log(wx1aoc1v1);
    //     console.log(i+1);
    //     fs.appendFileSync(path, JSON.stringify(wx1aoc1v1));
        
    // }

    let {_aocWorkExperiences, _aocfromInclude, _aoclength} = await wxmodel.getAocWorkExperienceIndices(data.uids.aoc1v1, 5, 2);

    console.log(JSON.stringify(_aocWorkExperiences));
    console.log(_aocWorkExperiences.length);
/**
 * Returns workexperience object 
 * @notice 
 * @param {uint256} _aocWorkExperiences
 * @returns {WorkExperienc}
 */
    for (let i=0; i<_aocWorkExperiences.length; i++) {
        console.log(JSON.stringify(_aocWorkExperiences[i]))
        let workExperience = await wxmodel.getWorkExperienceByIndex(_aocWorkExperiences[i]);
        console.log(workExperience);
    }



    // let workExperience = await wxmodel.getWorkExperienceByIndex(_aocWorkExperiences);
    // console.log(fromInclude);
    // console.log(length);

    // console.log(workExperience);


// /**
//  * Returns list of indexs of the workexperience, fromInclude and length 
//  * @notice 
//  * @param {bytes8} data.uids.aoc1v1
//  * @param {uint} 1
//  * @param {uint} 1
//  * @returns {WorkExperience, integer, integer}
//  */

//     let {_peWorkExperiences, _pefromInclude, _pelength} = await wxmodel.getPEWorkExperienceIndices(data.gids.peGid, 3, 3);

//     console.log(JSON.stringify(_peWorkExperiences));
// /**
//  * Returns workexperience object 
//  * @notice 
//  * @param {uint256} _peWorkExperiences
//  * @returns {WorkExperienc}
//  */
//     for (let i=0; i<_peWorkExperiences.length; i++) {
//         let workExperience = await wxmodel.getWorkExperienceByIndex(_peWorkExperiences[i]);
//         console.log(workExperience);
//     }

callback();

}