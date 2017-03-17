#!/usr/bin/env bash

geth --verbosity 4 --rpc --rpcapi="db,eth,net,web3,personal,miner" --testnet --rpcport=8548 --fast --port=30306 --rpc --datadir /Users/mroon/Library/Ethereum/testnet/geth/chaindata-dev