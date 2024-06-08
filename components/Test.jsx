import React, { useState } from 'react'
import Web3 from 'web3';
import ABI from "@/utils/ABI.json"
const Test = () => {
    const [name, setName] = useState('');
    const [contract, setContract] = useState(null);

    const connectToContract = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const networkId = await web3.eth.net.getId();
            const contractAddress = '0xeba4e11dda21354e667cedd77a0d1d5f5feeedbc';
            const contractABI = ABI ; // Your contract ABI
            const deployedContract = new web3.eth.Contract(contractABI, contractAddress);
            const balance= deployedContract.methods.rentVehicle("DFDSS","123","120",20,"Egypt",162);
         
            setContract(deployedContract);
            console.log("deployedContract : ",deployedContract)
            console.log("balance : ",balance)

        } else {
            alert('Please install MetaMask to use this feature');
        }
    };
    const handleSetClick = async () => {
        if (contract) {
            await contract.methods.rentVehicle("DFDSS","123","120",20,"Egypt",162).send({ from:window.ethereum.selectedAddress });
            alert('Name set successfully!');
        } else {
            alert('Please connect to contract first');
        }
    };
    return (
        <>
        <button onClick={()=> connectToContract()}>try</button>
        <button onClick={()=> handleSetClick()}>try1</button>
        </>
    )
}

export default Test

