var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

var owner = "0xdd9df207ce1d2df832d9f6882c8521c6b4df4cd3";

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
                                "0xdd9df207ce1d2df832d9f6882c8521c6b4df4cd3",
                                "0x6d8B18F9b737160A73F536393C908FE89961E570",
                                "0xC62e02ddc6C1A78ca63F144253E74c85ecB76B74",
                            ]
                            fs.writeFileSync("../../imports/contracts/soar-coin-ropsten.json", JSON.stringify(json));
                        }
                    });
                console.log(contract.address) // the contract address
            }
        }
    }
);

