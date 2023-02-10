const fs = require('fs');
var crypto = require("crypto");

const addingWEx = () => {
        let data = {
        uidsWx: {
        wx1aoc1v1:"",
        wx1aoc2v1:"",
        wx1aoc1v2:"",
        wx1aoc2v2:"",
        wx2aoc1v1:"",
        wx2aoc2v1:"",
        wx2aoc1v2:"",
        wx2aoc2v2:"",
        }
    }
    return data;
}

const vendors = (count) => {
    var json = "{";
    for (var i = 1; i <= count; i++) {
    //   vendor1: "v1_"+crypto.randomBytes(2).toString('hex'),
        i == count ? json  += `\"vendor${i}\":\"\"` : json  += `\"vendor${i}\":\"\",`;
    }
    json += "}";
    // console.log("json:",json);
    json = JSON.parse(json);
    var i = 1;
    for (const [key, value] of Object.entries(json)) {
        json[key] = `v${i++}_`+crypto.randomBytes(2).toString('hex');
    } 
    return json;
}

const assignVendorKey = async(json) => {
    for ( const [key, value] of Object.entries(json.vdrKeys)) {
        // console.log(web3.eth);
        keyPair = await web3.eth.accounts.create();
        json.vdrKeys[key] = keyPair;
        // console.log(`${key}`)
        // json[key] = key;
        // console.log(json)
  
    }
    return json;
    // for (const [key, value] of Object.entries(object1)) {
    //     console.log(`${key}: ${value}`);
    //   }
//     keyPair = await web3.eth.accounts.create();
//     data.keys.bank2 = keyPair;
}


module.exports = async function (callback) {
    let path = './scripts/test/data_copy.json';
    let data = addingWEx();
    let existingJson = fs.readFileSync(path);   // read the data from the file in the form of data string 
    let existingObject = JSON.parse(existingJson); // parse it in the form of object 

    console.log("creating vendor");
    var vdr = {};
    vdr.vendor = vendors(10);
    vdr.vdrKeys = {...vdr.Keys ,...vdr.vendor}
    var key = await assignVendorKey(vdr);
    existingObject = {...existingObject, ...vdr};
    console.log(existingObject);
    existingObject.uids = { ...existingObject.uids, ...data.uidsWx}; //tring to merge the contents in the field uids in existingObject
    newData = JSON.stringify(existingObject);
    fs.writeFileSync(path,newData);
    callback();
}
















    // console.log(vdr);
    // console.log(Object.keys(vdr).length);
    // let vdr1[vendor] = vdr
    // console.log(vdr1);
    // vdr.vdrKeys = { ...vdr.vdrKeys, ...vdr}
    // console.log(vdr);
    // var key = await assignVendorKey(vdr);
    // console.log(existingObject);
    // existingObject = { ...existingObject, vdr }; // tring to merge the contents in the existingObject
    // and the contents in the data object
    // existingObject.uids = { ...existingObject.uids, ...data.uidsWx}; //tring to merge the contents in the field uids in existingObject
    //                                                                  // and the contents in the fields uidsWxdata object
    // console.log(JSON.stringify(existingObject.vendor1));
    // console.log(existingObject.`vendor${1}`);
    // newData = JSON.stringify(existingObject);
    // fs.writeFileSync(path,newData);
//     callback();
// }
