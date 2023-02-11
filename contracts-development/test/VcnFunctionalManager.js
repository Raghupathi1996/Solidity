var VcnFunctionalManager = artifacts.require("VcnFunctionalManager")
// The problem in deploying in this is the truffle doesn't use network setup and the contracts migrated within the container
// const Token = artifacts.require("MyToken")
// const chai = require("./setupchai.js")
// const BN = web3.utils.BN
// const expect = chai.expect;
//start writing test from here
contract('VcnFunctionalManager', async() => {
    // const [deployerAccount, recipient, anotherAccount] = accounts;
    //as we're transferring all tokens from deployer a/c to MyTokenSale contract, so deployer a/c should not contain any tokens 
    it("should add a currency Name in to the SC", async() => {
        let vcnInstance = await VcnFunctionalManager.deployed()
        const length = await vcnInstance.getCurrencyListLength.call("0xf9a731e46b2236cf3d8c35a2784e6b1a75598dcc");
        assert.equal(length,1, "INR is already inserted")
        // return expect(instance.getCurrencyListLength(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))
    })
    //MyTokenSale contract should contain all the tokens
    // it("all the tokens should be in TokenSale contract by default", async() => {
    //     let instance = await Token.deployed()
    //     let balanceOfMyTokenSaleContract = await instance.balanceOf(TokenSale.address)
    //     let totalSupply = await instance.totalSupply()
    //     expect(balanceOfMyTokenSaleContract).to.be.a.bignumber.equal(totalSupply)
    // })
    // it("should be possible to buy tokens", async() => {
    //     let tokenInstance = await Token.deployed()
    //     let tokenSaleInstance = await TokenSale.deployed()
    //     let kycInstance = await KycContract.deployed()
    //         // let balanceBefore = await tokenInstance.balanceOf(deployerAccount)
    //     await kycInstance.KycCompleted(deployerAccount, { from: deployerAccount }) //trying to whitelist itself
    //     expect(tokenSaleInstance.sendTransaction({ from: deployerAccount, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled
    //         // balanceBefore = balanceBefore.add(new BN(1))
    //         //return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore)
    // })
})