import web3 from './web3';
import DonateContract from './DonateContract.json';

const instance = new web3.eth.Contract(
    JSON.parse(DonateContract.interface),
    //REPLAFCE YOUR CONTRACT ADDRESS HERE
    '0x9458d56Ed4eb3f466fec067C37B1745affec93C2'
);

export default instance;