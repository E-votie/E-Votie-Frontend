// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers'

const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "userId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "walletAddress",
                "type": "address"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_userId",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "getUserId",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_userId",
                "type": "string"
            }
        ],
        "name": "getWalletAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "isWalletRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const CONTRACT_ADDRESS = "0x10a31dd7da68cdae58bbf067b1e96c828e661b03";

export const signing = () => {
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [UserID, setUserID] = useState('');
    const [signature, setSignature] = useState('');
    const [verified, setVerified] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Accounts:', accounts);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                console.log('Connected address:', address);
                setAccount(address);
                await checkWalletRegistration(address, provider);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                if (error.code === 4001) {
                    console.error('User rejected the request.');
                } else {
                    console.error('Unexpected error:', error.message);
                }
            }
        } else {
            console.error('MetaMask is not installed');
        }
    };

    const checkWalletRegistration = async (address, provider) => {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
            const result = await contract.isWalletRegistered(address);
            setIsRegistered(result);
            console.log('Is wallet registered:', result);
        } catch (error) {
            console.error('Error checking wallet registration:', error);
        }
    };

    const signMessage = async () => {
        if (!account) {
            alert('Please connect to MetaMask first');
            return;
        }
        if (!message) {
            alert('Please enter a message to sign');
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(message);
            setSignature(signature);
            return signature;
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    const verifyMessage = async () => {
        if (!message || !signature) {
            alert('Please sign a message first');
            return;
        }
        try {
            const signerAddr = ethers.verifyMessage(message, signature);
            if (signerAddr.toLowerCase() === account.toLowerCase()) {
                setVerified(true);
            } else {
                setVerified(false);
            }
        } catch (error) {
            console.error('Error verifying message:', error);
            setVerified(false);
        }
    };

    const getWalletAddress = async (userId) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
                const walletAddress = await contract.getWalletAddress(userId);
                console.log('Wallet address for User ID', userId, ':', walletAddress);
                return walletAddress;
            } catch (error) {
                console.error('Error getting wallet address:', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    };

    const RegisterWalletAddress = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
                const tx = await contract.addUser(UserID, account);
                await tx.wait();
                console.log('User registered successfully');
                await checkWalletRegistration(account, provider);
            } catch (error) {
                console.error('Error registering user:', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    };

    return {
        connectWallet,
        checkWalletRegistration,
        signMessage,
        verifyMessage,
        getWalletAddress,
        RegisterWalletAddress,
        account,
        message,
        setMessage,
        UserID,
        setUserID,
        signature,
        verified,
        isRegistered,
    };
};