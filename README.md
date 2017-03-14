# soar-coin
soar-coin is an ERC20 Token. This repo contains the contracts and the UI

## Contract functionality

There are two contracts:
* standard token contract
* wallet contract

Of the default ERC20 Token functions only the following are implemented:
* `balanceOf(address _owner)`
* `transfer(address _to, uint256 _value)` 

### minting new coins

the contract owner can mint new coins which will be added to his account and to the total supply.

## Wallet functionality

The wallet is a web interface which has following requirements
* allow transfer of coins from one account to the other
* run on mobile phones, tablets and desktops
* the wallet keystore is held on the device
* the device can sign transasctions on its own

### user stories

The user stories describe what a user can do with the application. Here are the high-level stories:
* as a user I want to create a keystore so as to hold SOAR coins on my mobile device
* as a user I want to protect my keystore with a password so as to avoid theft or misues
* as a user I want to change my password so as to avoid theft or misuse
* as a user I want to send money to another account so as to pay for goods and services
* as a user I want to request a money transfer so as to get paid for goods and services
* as a user I want to enter the recipient address and the amount of the transfer by scanning a QR-Code sa as to avoid typos
* as a user I want to create a QR-Code with my address and the transaction amount so as to get paid the correct amount swiftly
* as a user I want to see the transaction history to know when I spent or received SOAR
