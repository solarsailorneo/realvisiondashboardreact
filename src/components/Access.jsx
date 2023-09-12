import React, { useContext, useState, useEffect } from 'react';
import { RealVisionGenesisContext } from '../context/RealVisionGenesisContext';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from '.';
import { shortenAddress } from '../utils/shortenAddress';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"


const Access = ({timeSeries}) => {
    // console.log("useContext: ", useContext(FilumContext));
    const TimeSeriesComponent = timeSeries;
    const [hasGenesisNFT, setHasGenesisNFT] = useState(false);


    const { connectWallet, currentAccount, checkDelegationAndTokenOwnership, isLoading  } = useContext(RealVisionGenesisContext);
    
    useEffect(() => {
        const fetchGenesisNFTStatus = async () => {
            const result = await checkDelegationAndTokenOwnership();
            setHasGenesisNFT(result);
        };
    
        fetchGenesisNFTStatus();
    }, [checkDelegationAndTokenOwnership]);
    

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    {!currentAccount && 
                        (<button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            connect to Wallet
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                    <div className="flex justify-between flex-col w-full h-full">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                            </div>
                            <BsInfoCircle fontSize={17} color="#fff" />
                        </div>
                        <div>
                            <p className="text-white font-light text-sm">
                                {shortenAddress(currentAccount)}
                            </p>
                            <p className="text-white font-semibold text-lg mt-1">
                                Ethereum Wallet
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {hasGenesisNFT ? (<TimeSeriesComponent/>) : (null)}
                            {/* <button
                            type="button"
                            // onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                All Passes Have Been Minted
                            </button>
                            <p className="text-left mt-5 text-white font-light md-w9/12 w-11/12 text-base">
                                Get a pass on <b><a href="https://opensea.io/collection/filum" style={{fontWeight: "bold", textDecoration: "underline"}}>OpenSea</a></b>.
                            </p> */}
                        </>
                    )}        
                </div>

            </div>
        </div>
    );
}

export default Access;