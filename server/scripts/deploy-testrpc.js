var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

// var owner = "0xdd9df207ce1d2df832d9f6882c8521c6b4df4cd3";
// var recipient = "0x6ce7e9228e386938cb13124e4010e7e9b5edba56";
var owner = "0x4615ff6690a3bb23bd85051c5c69abba4092bbb4";

let provider = new Web3.providers.HttpProvider('http://localhost:8549');
var web3 = new Web3(provider);

var source = fs.readFileSync("../../imports/contracts/soar-coin.sol");

var output = solc.compile(source.toString(), 1);

var abi = output.contracts[':SoarCoinImplementation'].interface;
var soarImpl = web3.eth.contract(JSON.parse(output.contracts[':SoarCoinImplementation'].interface));
var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface));

// web3.personal.unlockAccount(owner, "ppp");
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


                soarInstance = soar.new(contract.address, {
                    from: owner,
                    data: '0x' + output.contracts[':SoarCoin'].bytecode,
                    gas: 1000000},
                function (err, contract) {
                    if (contract.address) {
                        console.log("SOAR:", contract.address) // the contract address
                        var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface)).at(contract.address);
                        soarImpl.setTrustedContract(contract.address, {
                            from: owner,
                            gas: 1000000
                        });
                        console.log("implementation is", soar.getImplementation());
                        console.log("balance of owner:", soar.balanceOf(owner).toString());
                        var json = {};
                        json.token = {
                            address: contract.address,
                            abi: JSON.parse(output.contracts[':SoarCoin'].interface)
                        }
                        json.tokenImplementation = {
                            address: soar.getImplementation(),
                            abi: JSON.parse(output.contracts[':SoarCoinImplementation'].interface)
                        }
                        json.owner = owner;
                        json.addresses = [
                            "0x4615ff6690a3bb23bd85051c5c69abba4092bbb4",
                            "0x5706f06887f5f2a17edc444e122ebed1d5da2e7b",
                            "0xe2f8a351678d4264df0522d3d61d83258ce83daf",
                            "0x41c0b08962537ca31457eaee11e23f155a3c00f4",
                            "0x47f29212d23dbd98c0b6fa101848c770fa20e314",
                            "0x3e2ce8d8116627dcde7b7dde207bfbb413fa2a96",
                            "0xa6b8b75d85b6d2c22b8e9e2768f2f405cf09005a",
                            "0x4acb9177ea5166e677ee3462347882f6c0e40fe6",
                            "0x2022fb18ac76563c4eedb1d40a319548938c4f63",
                            "0xce0d46d924cc8437c806721496599fc3ffa268b9",
                        ]
                        fs.writeFileSync("../../imports/contracts/soar-coin-testrpc.json", JSON.stringify(json));
                    }
                });
                console.log(contract.address) // the contract address
            }

            // Note that the returned "myContractReturned" === "myContract",
            // so the returned "myContractReturned" object will also get the address set.
        }
    }
);

