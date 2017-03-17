var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

var owner = "0xc5ca41af6dda284367cc903a34565438a01480fb";

let provider = new Web3.providers.HttpProvider('http://localhost:8548');
var web3 = new Web3(provider);

var source = fs.readFileSync("../../imports/contracts/soar-coin.sol");

var output = solc.compile(source.toString(), 1);

var abi = output.contracts[':SoarCoinImplementation'].interface;
var soarImpl = web3.eth.contract(JSON.parse(output.contracts[':SoarCoinImplementation'].interface));
var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface));

web3.personal.unlockAccount(owner, "ppp");
var soarImplInstance = soarImpl.new(500000000000000000000, {
        from: owner,
        nonce: web3.eth.getTransactionCount(owner, "pending"),
        data: '0x' + output.contracts[':SoarCoinImplementation'].bytecode,
        gas: 1000000
    },
    function (err, contract) {
        console.log("creating implementation contract", err, contract);
        if (!err) {
            // NOTE: The callback will fire twice!
            // Once the contract has the transactionHash property set and once its deployed on an address.

            // e.g. check tx hash on the first call (transaction send)
            if (contract.address) {
                soarImpl = soarImpl.at(contract.address);
                console.log("balance of owner:", soarImpl.balanceOf(owner).toString());

                web3.personal.unlockAccount(owner, "ppp");
                soarInstance = soar.new(contract.address, {
                        from: owner,
                        data: '0x' + output.contracts[':SoarCoin'].bytecode,
                        nonce: web3.eth.getTransactionCount(owner, "pending"),
                        gas: 1000000
                    },
                    function (err, contract) {
                        console.log("creating base contract", err, contract);
                        if (contract.address) {
                            console.log("SOAR:", contract.address) // the contract address
                            var soar = web3.eth.contract(JSON.parse(output.contracts[':SoarCoin'].interface)).at(contract.address);
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
                                "0xc5ca41af6dda284367cc903a34565438a01480fb",
                                "0x175a6bebad8458a30c7a228892df4a9cf6d765ee",
                                "0x18b3a6110029ef8dc2d0d458b7eaddf26ca1b871",
                            ];
                            json.password = "ppp";
                            fs.writeFileSync("../../imports/contracts/soar-coin-ropsten.json", JSON.stringify(json));
                        }
                    });
                console.log(contract.address) // the contract address
            }
        }
    }
);

