const fs = require('fs');
var crypto = require("crypto");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const initData = () => {
    path = './scripts/test/data.json'
    const data = {
      egp: "EGP_"+crypto.randomBytes(2).toString('hex'),
      vendor1: "v1_"+crypto.randomBytes(2).toString('hex'),
      vendor2: "v2_"+crypto.randomBytes(2).toString('hex'),
      bank1:"bank_"+crypto.randomBytes(2).toString('hex'),
      bank2:"bank_"+crypto.randomBytes(2).toString('hex'),
      keys:{
        admin:{
          privateKey:"0x71750a9f1c57c09893b2ae0cad7ea9a15171919021d05ac4e0c5c9413ebad2dd", 
          address:"0xf9a731e46b2236cf3d8c35a2784e6b1a75598dcc"
        },
        egp:{},
        vendor1:{},
        vendor2:{},
        bank1:{},
        bank2:{},
      },
      gids:{
        peGid:"",
        bank1Gid:"",
        bank2Gid:"",
        ven1Gid:"",
        ven2Gid:"",
      },
      uids:{
        aoc1v1:"",
        aoc2v1:"",
        aoc1v2:"",
        aoc2v2:"",
        pa1V1:"",
        pa1V2:"",
        pa2V1:"",
        pa2V2:"",
        bg1bank1pa1V1:"",
        a1bg1bank1pa1V1:"",
      }
    }
    console.log(data);
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(data));
    return data;
  }

  const editData = (newData) => {
    path = './scripts/test/data.json';
    try {
      fs.unlinkSync(path);
      console.log("Delete File Successfully");
    } catch (error) {
      console.log(error);
    }

    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
  }

  module.exports = async function (callback) {

    let data = await initData();
    let keyPair = await web3.eth.accounts.create();
    data.keys.egp = keyPair;
    keyPair = await web3.eth.accounts.create();
    data.keys.bank1 = keyPair;
    keyPair = await web3.eth.accounts.create();
    data.keys.bank2 = keyPair;
    keyPair = await web3.eth.accounts.create();
    data.keys.vendor1 = keyPair;
    keyPair = await web3.eth.accounts.create();
    data.keys.vendor2 = keyPair;

    console.log(data);
  
    data = await editData(data);

    callback()
  }