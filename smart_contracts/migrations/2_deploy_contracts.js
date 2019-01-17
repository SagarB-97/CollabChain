var Verify = artifacts.require("./Verify.sol");

module.exports = function (deployer) {
	deployer.deploy(Verify);
};