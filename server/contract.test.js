import {chai} from 'meteor/practicalmeteor:chai';
import {Promise} from "meteor/promise";
import Web3 from "web3";

import contractDefs from "../imports/contracts/soar-coin-testrpc.json";

describe("test on testrpc", function () {
    let web3;
    let token;
    let tokenImpl;
    let transfered = 0;
    this.timeout(5000);

    before(function (done) {
        provider = new Web3.providers.HttpProvider("http://localhost:8549");
        web3 = new Web3(provider);

        token = web3.eth.contract(contractDefs.token.abi).at(contractDefs.token.address);
        tokenImpl = web3.eth.contract(contractDefs.tokenImplementation.abi).at(contractDefs.tokenImplementation.address);

        done();
    });

    it("gets the totalSupply from the token and tokenImplementation", function () {
        chai.assert.equal(token.totalSupply().toNumber(), tokenImpl.totalSupply().toNumber(), "the total supply must be identical");
        chai.assert.notEqual(token.totalSupply(), 0, "total supply must be non zero")
    });

    it("shows the totalSupply as the balance ofthe owner", function () {
        chai.assert.equal(token.totalSupply().toNumber(), token.balanceOf(contractDefs.addresses[0]).toNumber())
    });

    it("has the trusted contract address as the token contract", function () {
        chai.assert.equal(contractDefs.token.address, tokenImpl.trustedContract());
    });

    it("does not change the balance when a transfer is made on the tokenImplementation", function (done) {
        tokenImpl.transfer(contractDefs.addresses[0], contractDefs.addresses[1], 500000000, {
            from: contractDefs.addresses[0],
            data: undefined,
            value: web3.toHex(0),
            nonce: web3.eth.getTransactionCount(contractDefs.addresses[0], "pending"),
            gas: 100000
        }, function (err, res) {
            if (!err) {
                console.log("transfer", err, res);
                // chai.assert.equal(res, true, "the return value from transfer must be true");
                chai.assert.equal(token.totalSupply().toNumber(), token.balanceOf(contractDefs.addresses[0]).toNumber());
                chai.assert.equal(token.balanceOf(contractDefs.addresses[1]).toNumber(), 0);
                done();
            } else if (err) {
                chai.assert.fail("error in transfer " + err.message);
                done();
            }
        })
    });

    it("changes the balance when a transfer is made on the token", function (done) {
        transfered += 500000000;
        token.transfer(contractDefs.addresses[2], 500000000, {
            from: contractDefs.addresses[0],
            data: undefined,
            value: web3.toHex(0),
            nonce: web3.eth.getTransactionCount(contractDefs.addresses[0], "pending"),
            gas: 100000
        }, function (err, res) {
            if (!err) {
                console.log("transfer", err, res);
                // chai.assert.equal(res, true, "the return value from transfer must be true");
                chai.assert.equal(token.balanceOf(contractDefs.addresses[2]).toNumber(), 500000000);
                chai.assert.equal(token.totalSupply().toNumber(), token.balanceOf(contractDefs.addresses[0]).toNumber() + transfered);
                done();
            } else if (err) {
                chai.assert.fail("error in transfer " + err.message);
                done();
            }
        })
    });

    it("does not change the owner when called from an incorrect address", function (done) {
        token.transferOwnership(contractDefs.addresses[2], {
            from: contractDefs.addresses[1],
            data: undefined,
            value: web3.toHex(0),
            nonce: web3.eth.getTransactionCount(contractDefs.addresses[1], "pending"),
            gas: 100000
        }, function (err, res) {
            if (!err) {
                console.log("transferOwnership", err, res);
                // chai.assert.equal(res, true, "the return value from transfer must be true");
                chai.assert.equal(token.owner().toString(), contractDefs.addresses[0]);
                chai.assert.equal(token.balanceOf(contractDefs.addresses[2]).toNumber(), 500000000);
                done();
            } else if (err) {
                console.log(err);
                chai.assert.fail("error in transferOwnership " + err.message);
                done();
            }
        });
    });

    it("does  change the owner when called from the correct address", function (done) {
        let ownerBalance = token.balanceOf(contractDefs.addresses[0]).toNumber();
        token.transferOwnership(contractDefs.addresses[2], {
            from: contractDefs.addresses[0],
            data: undefined,
            value: web3.toHex(0),
            nonce: web3.eth.getTransactionCount(contractDefs.addresses[0], "pending"),
            gas: 100000
        }, function (err, res) {
            if (!err) {
                console.log("transferOwnership", err, res);
                // chai.assert.equal(res, true, "the return value from transfer must be true");
                chai.assert.equal(token.owner().toString(), contractDefs.addresses[2]);
                chai.assert.equal(token.balanceOf(contractDefs.addresses[0]).toNumber(), 0);
                chai.assert.equal(token.balanceOf(contractDefs.addresses[2]).toNumber(), ownerBalance + 500000000);
                done();
            } else if (err) {
                console.log(err);
                chai.assert.fail("error in transferOwnership " + err.message);
                done();
            }
        });
    });
});