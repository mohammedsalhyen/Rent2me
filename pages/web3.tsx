// src/web3.tsx
import Web3 from 'web3';
declare global {
     interface Window {
          ethereum?: any;
     }
}
const getWeb3 = async () => {
     if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
               await window.ethereum.request({ method: 'eth_requestAccounts' });
               return web3;
          } catch (error) {
               console.error('User denied account access');
               return null;
          }
     } else if (window.web3) {
          return new Web3(window.web3.currentProvider);
     } else {
          console.error('No Ethereum browser extension detected, install MetaMask on desktop.');
          return null;
     }
};

export default getWeb3;
