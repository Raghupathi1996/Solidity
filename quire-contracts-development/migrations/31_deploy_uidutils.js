const UidUtils = artifacts.require('UidUtils');

module.exports = async function (deployer) {
    await deployer.deploy(UidUtils);
  };
