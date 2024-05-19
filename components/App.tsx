// src/App.tsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import getWeb3 from '@/pages/web3';
import getContract from '@/pages/contract';
import Web3 from "web3";

interface Rent2Me {
    _methods: {
        rentCar: () => { send: ({ from, value }: { from: string, value: string }) => Promise<void> };
        startRental: () => { send: ({ from }: { from: string }) => Promise<void> };
        endRental: () => { send: ({ from }: { from: string }) => Promise<void> };
        returnCar: () => { send: ({ from }: { from: string }) => Promise<void> };
        refundDeposit: () => { send: ({ from }: { from: string }) => Promise<void> };
        withdrawRent: () => { send: ({ from }: { from: string }) => Promise<void> };
        getContractBalance: () => { call: () => Promise<string> };
    };
}

const App: React.FC = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [accounts, setAccounts] = useState<string[]>([]);
    const [contract, setContract]: any = useState<Rent2Me | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const web3Instance: any = await getWeb3();
                const accounts = await web3Instance.eth.getAccounts();
                const contractInstance = getContract(web3Instance) as unknown as Rent2Me;

                setWeb3(web3Instance);
                setAccounts(accounts);
                setContract(contractInstance);
                console.log(contractInstance)
                // Fetch initial contract balance
                const initialBalance: any = await contractInstance._methods.getContractBalance().call();
                setBalance(web3Instance.utils.fromWei(initialBalance, 'ether'));
            } catch (error) {
                console.error('Could not connect to contract or chain.', error);
            }
        };

        init();
    }, []);
    const handleRentCar = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.rentCar().send({ from: accounts[0], value: web3?.utils.toWei('1', 'ether') + '0' }); // Adjust value as needed
                const updatedBalance = await contract.methods.getContractBalance().call();
                setBalance(web3?.utils.fromWei(updatedBalance, 'ether') || null);
            } catch (error) {
                console.error('Error renting car:', error);
            }
        }
    };

    const handleStartRental = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.startRental().send({ from: accounts[0] });
            } catch (error) {
                console.error('Error starting rental:', error);
            }
        }
    };

    const handleEndRental = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.endRental().send({ from: accounts[0] });
            } catch (error) {
                console.error('Error ending rental:', error);
            }
        }
    };

    const handleReturnCar = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.returnCar().send({ from: accounts[0] });
            } catch (error) {
                console.error('Error returning car:', error);
            }
        }
    };

    const handleRefundDeposit = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.refundDeposit().send({ from: accounts[0] });
            } catch (error) {
                console.error('Error refunding deposit:', error);
            }
        }
    };

    const handleWithdrawRent = async () => {
        if (contract && accounts.length > 0) {
            try {
                await contract.methods.withdrawRent().send({ from: accounts[0] });
            } catch (error) {
                console.error('Error withdrawing rent:', error);
            }
        }
    };


    return (
        <div className="App">
            <h1>Rent2Me DApp</h1>
            <p>Contract Balance: {balance ? `${balance} ETH` : 'Loading...'}</p>
            <button onClick={handleRentCar}>Rent Car</button>
            <button onClick={handleStartRental}>Start Rental</button>
            <button onClick={handleEndRental}>End Rental</button>
            <button onClick={handleReturnCar}>Return Car</button>
            <button onClick={handleRefundDeposit}>Refund Deposit</button>
            <button onClick={handleWithdrawRent}>Withdraw Rent</button>
        </div>
    );
};

export default App;