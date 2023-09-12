import React, { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';
import { RealVisionGenesisABI, RealVisionGenesisAddress, DelegateCashABI, DelegateCashAddress } from '../utils/constants';

export const RealVisionGenesisContext = React.createContext();

export const useEthereum = () => {
    const context = useContext(RealVisionGenesisContext);
    if (!context) {
        throw new Error("useEthereum must be used within a RealVisionGenesisProvider");
    }
    return context;
};



export const RealVisionGenesisProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({quantity: '', baseURI: ''});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
            const signerInstance = providerInstance.getSigner();
            setProvider(providerInstance);
            setSigner(signerInstance);
        }
    }, []);

    const getEthereumContract = () => {
        if (!signer) return null;
        return new ethers.Contract(RealVisionGenesisAddress, RealVisionGenesisABI, signer);
    }

    const getDelegateCashContract = () => {
        if (!signer) return null;
        console.log(DelegateCashABI);

        return new ethers.Contract(DelegateCashAddress, DelegateCashABI, signer);
    }
    

    const checkDelegationAndTokenOwnership = async () => {
        try {
            if (!currentAccount) return false;
    
            // Get the DelegateCash contract instance
            const delegateCashContract = getDelegateCashContract();
    
            // Get list of delegations for the connected address
            const delegations = await delegateCashContract.getDelegationsByDelegate(currentAccount);
    
            if (delegations.length === 0) return false; // No delegations for the connected address
    
            // Get the RealVisionGenesis contract instance
            const realVisionGenesisContract = getEthereumContract();
    
            // Create an array of promises to check ownership concurrently
            const ownershipProof = realVisionGenesisContract.balanceOf(currentAccount.toLowerCase());

            if(ownershipProof){
                return true;
            }
            else {
                return false;
            }
    
        } catch (error) {
            console.error("Error in checkDelegationAndTokenOwnership:", error);
            return false;
        }
    }
    
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
        
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        }
        catch (error) {
            console.log(error);

            throw new Error("No ethereum object");

        }
    }
    
    return (
        <RealVisionGenesisContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, checkDelegationAndTokenOwnership, isLoading }}>
            {children}
        </RealVisionGenesisContext.Provider>
    );

}