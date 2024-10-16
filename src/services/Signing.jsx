// DataContext.js
import {useState} from 'react';
import {ethers} from 'ethers'
import Swal from "sweetalert2";
import keycloakService from "./KeycloakService.jsx";
import ABI from './../../public/EmployeeKeyManagement.json'

const CONTRACT_ADDRESS = "0xf89afc48e5fa14377f8e27659e564633a947abe3";
console.log(CONTRACT_ADDRESS)
console.log('Contract ABI:', ABI);


export const signing = () => {
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [UserID, setUserID] = useState('');
    const [signature, setSignature] = useState('');
    const [verified, setVerified] = useState(false);
    const [isPublicKeyMatch, setIsPublicKeyMatch] = useState(false);

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
                await PublicKeyVerify(address);
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

    const PublicKeyVerify = async (account) => {
        try {
            const PublicKey = await getWalletAddress(keycloakService.getUserName());
            console.log(account,PublicKey)
            if(PublicKey === account){
                console.log("--------------->>>>>>>>>>>>>>>")
                setIsPublicKeyMatch(true)
                return true;
            }else{
                setIsPublicKeyMatch(false)
                return false;
            }
        } catch (error) {
            setIsPublicKeyMatch(false)
            console.error('Error checking wallet registration:', error);
        }
    };



    const signMessage = async () => {
        if (!account) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Please connect to MetaMask first"
            });
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
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "User rejected the request"
            });
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
        console.log(userId)
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
                const walletAddress = await contract.getPublicKey(userId);
                console.log('Wallet address for User ID', userId, ':', walletAddress);
                return walletAddress;
            } catch (error) {
                console.error('Error getting wallet address:', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    };

    return {
        connectWallet,
        signMessage,
        verifyMessage,
        getWalletAddress,
        PublicKeyVerify,
        account,
        message,
        setMessage,
        UserID,
        setUserID,
        signature,
        verified,
        isPublicKeyMatch,
    };
};