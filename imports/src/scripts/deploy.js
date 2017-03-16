var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

var owner = "0xdd9df207ce1d2df832d9f6882c8521c6b4df4cd3";
var recipient = "0x6ce7e9228e386938cb13124e4010e7e9b5edba56";
// var owner = "0x4615ff6690a3bb23bd85051c5c69abba4092bbb4";
// var recipient = "0x5706f06887f5f2a17edc444e122ebed1d5da2e7b";

let provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(provider);

web3.personal.unlockAccount(owner, "ppp");

var source = fs.readFileSync("../contracts/soar-coin.sol");

var output = solc.compile(source.toString(), 1);

var abi = output.contracts[':SoarCoinImplementation'].interface;
var soarImpl = web3.eth.contract(JSON.parse(output.contracts[':SoarCoinImplementation'].interface));
var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface));

var soarImplInstance = soarImpl.new(500000000000000000000, {
    from: owner,
    data: '0x' + output.contracts[':SoarCoinImplementation'].bytecode,
    gas: 1000000},
    function(err, contract) {
        if(!err) {
            // NOTE: The callback will fire twice!
            // Once the contract has the transactionHash property set and once its deployed on an address.

            // e.g. check tx hash on the first call (transaction send)
            if(contract.address) {
                soarImpl = soarImpl.at(contract.address);
                console.log("balance of owner:", soarImpl.balanceOf(owner).toString());

                web3.personal.unlockAccount(owner, "ppp");
                soarImpl.transfer.call(recipient, 100000000, {
                    from: owner,
                    gas: 1000000
                }, function(err, res) {
                    console.log("soarImpl transfer callback", err, res)
                    console.log("soarImpl balance of owner after transfer:", soarImpl.balanceOf(owner).toString());
                    console.log("soarImpl balance of recipient after transfer:", soarImpl.balanceOf(recipient).toString());
                })

                web3.personal.unlockAccount(owner, "ppp");
                soarInstance = soar.new(contract.address, {
                    from: owner,
                    data: '0x' + output.contracts[':SoarCoin'].bytecode,
                    gas: 1000000},
                function (err, contract) {
                    if (contract.address) {
                        console.log("SOAR:", contract.address) // the contract address
                        var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface)).at(contract.address);
                        console.log("implementation is", soar.getImplementation());
                        console.log("balance of owner:", soar.balanceOf(owner).toString());
                        web3.personal.unlockAccount(owner, "ppp");
                        soar.transfer.call(recipient, 100000000, {
                            from: owner,
                            gas: 1000000
                        }, function(err, res) {
                            console.log("transfer callback", err, res)
                            console.log("balance of owner after transfer:", soar.balanceOf(owner).toString());
                        })
                    }
                });
                console.log(contract.address) // the contract address
            }

            // Note that the returned "myContractReturned" === "myContract",
            // so the returned "myContractReturned" object will also get the address set.
        }
    }
);

