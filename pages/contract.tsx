// src/contract.js
import Web3 from 'web3';
import abiContract from "./ABI.json"
const contractAddress = '0x40df9e03ed587f603812ccd496754f1df49ef5c2';

const getContract = async (web3: Web3) => {
     const networkId = await web3.eth.net.getId();
     const instance = new web3.eth.Contract(abiContract as any, contractAddress);
     return instance;
};

export default getContract;
