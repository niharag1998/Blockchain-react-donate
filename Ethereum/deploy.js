const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledDonation = require('./build/DonateContract.json');


const provider = new HDWalletProvider(
    'ENTER YOUR 12 WORD CODE HERE',
    'YOUR INFURA.IO ACCESS TOKEN HERE'
);

const web3 = new Web3(provider);
//const accounts, result;
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);
    try {
        const result = await new web3.eth.Contract(JSON.parse(compiledDonation.interface))
            .deploy({
                data: '0x' + compiledDonation.bytecode
            })
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        console.log('Contract deployed to ', result.options.address);
    } catch (err) {
        console.log('Error', err.message);
    }
};

deploy();