
import data from '../../data/data.json';
import { bonbonDataModel } from '../../data/data-model';
import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Image from 'next/image'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import ImageList from "@material-ui/core/ImageList";
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"; // to test
import {
    CANDY_MACHINE_PROGRAM,
    CandyMachine,
    awaitTransactionSignatureConfirmation,
    getCandyMachineState,
    mintOneToken
} from "../../util/candy-machine";
import MintButton from '../../components/saint/MintButton';
import { useEffect, useState } from 'react';


interface AlertState {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
}



function BonBonDrops() {
    const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
    const [isMinting, setIsMinting] = useState(false); // true when user got to press 
    const [soldOuts, setSoldOuts] = useState([]);
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [itemsRedeemed, setItemsRedeemed] = useState(0);
    const [mintButtonActive, setMintButtonActive] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    const [bonbonData, setBonBonData] = useState(data.bonbonnftdrops);
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });


    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachine>();
    const setConnection = (config: any) => {
        const anchorWallet = {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;

        const connection = new anchor.web3.Connection(config.rpcHost);
      
       return  getCandyMachineState(
                anchorWallet,
                config.candyMachineId,
                connection
            );
    }
    const selectItem = async (item: bonbonDataModel) => {
        item.selected = !item.selected
        const config = await createConnectionConfig(item)
        item.config = config;
        const { itemsRemaining, itemsAvailable, itemsRedeemed } = await setConnection(config);


        if (itemsRemaining <= 0) {
            setAlertState({
                open: true,
                message: `${item.main_title} Sold Out`,
                severity: "error",
            });
            item.soldOut = true;
            item.selected = false;

            const newSoldOut = soldOuts
            if (!newSoldOut.find(o => o === item.id))
                newSoldOut.push(item.id)
            setSoldOuts(newSoldOut)

        }
        item.Items_Remaining = itemsRemaining;

        let bonbonDataCopy = [...bonbonData];
        const objIndex = bonbonData.findIndex((obj => obj.id == item.id));
        bonbonDataCopy[objIndex] = item;
        setMintButtonActive(bonbonDataCopy.some(e => e.selected))
        setBonBonData(bonbonDataCopy)

    }

    const mintSelected = () => {

        bonbonData.filter(nft => nft.selected).map(async (nft, i) => {
            const nftConfig = await createConnectionConfig(nft);
            (i != 0) ? setTimeout(() => { onMint(nftConfig) }, 15000) : onMint(nftConfig);

        })
    }
    const createConnectionConfig = async (bonbonNFTData: bonbonDataModel) => {
        const treasury = new anchor.web3.PublicKey(
            bonbonNFTData.Treasury_Address!
        );
        const config = new anchor.web3.PublicKey(
            bonbonNFTData.Candy_Machine_Config!
        );

        const candyMachineId = new anchor.web3.PublicKey(
            bonbonNFTData.Candy_Machine_Id!
        );

        const network = bonbonNFTData.Solana_Network as WalletAdapterNetwork;

        const rpcHost = bonbonNFTData.Solana_RPC_Host!;
        
        const txTimeout = 30000;
        return {
            treasury, config, candyMachineId, network, rpcHost, txTimeout, id: bonbonNFTData.id, main_title: bonbonNFTData.main_title
        }


    }

    const onMint = async (nftConfig: any) => {

        try {
            setIsMinting(true);
            const anchorWallet = {
                publicKey: wallet.publicKey,
                signAllTransactions: wallet.signAllTransactions,
                signTransaction: wallet.signTransaction,
            } as anchor.Wallet;
    const connection = new anchor.web3.Connection(nftConfig.rpcHost);
      
            const provider = new anchor.Provider(connection, anchorWallet, {
                preflightCommitment: "recent",
            });
            const idl = await anchor.Program.fetchIdl(
                CANDY_MACHINE_PROGRAM,
                provider
            );

            const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM, provider);
            const candyMachine: CandyMachine = {
                id: nftConfig.candyMachineId,
                connection: connection,
                program,
            }
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                const mintTxId = await mintOneToken(
                    candyMachine,
                    nftConfig.config,
                    wallet.publicKey,
                    nftConfig.treasury
                );

                const status: any = await awaitTransactionSignatureConfirmation(
                    mintTxId,
                    nftConfig.txTimeout,
                    connection,
                    "singleGossip",
                    false
                );
                const { itemsRemaining, itemsAvailable, itemsRedeemed } = await setConnection(nftConfig);

                const bonbonDataCopy = [...bonbonData];
                const objIndex = bonbonData.findIndex((obj => obj.id === nftConfig.id));
                bonbonDataCopy[objIndex].Items_Remaining = itemsRemaining;
		if(itemsRemaining<=0){                 
                    
                    const newSoldOut = soldOuts
                    if (!newSoldOut.find(o => o===pastDataCopy[objIndex].id))
                    newSoldOut.push(pastDataCopy[objIndex].id)
                    setSoldOuts(newSoldOut)                    
                }
                setBonBonData(bonbonDataCopy)
               // console.log("mint status", status);
                if (!status?.err) {
                    setAlertState({
                        open: true,
                        message: "Congratulations! Mint succeeded!",
                        severity: "success",
                    });
                } else {
                    setAlertState({
                        open: true,
                        message: "Mint failed! Please try again!",
                        severity: "error",
                    });
                }
            }
        } catch (error: any) {
            // TODO: blech:
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                if (error?.message?.indexOf("0x138")) {
                } else if (error?.message?.indexOf("0x137")) {
                    message = `SOLD OUT!`;
                } else if (error?.message?.indexOf("0x135")) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    setIsSoldOut(true);
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlertState({
                open: true,
                message,
                severity: "error",
            });
        } finally {
            setIsMinting(false);
        }
    };
    const remainingItems = (item) => {
        if (soldOuts.find(o => o === item.id) || item?.Items_Remaining == 0)
            return <button className="sold_out" >Sold Out</button>
        else
            return item?.Items_Remaining > 0 && <button  >{`${item.Items_Remaining} remains`}</button>

    }

    return (
        <>
            <div className="past-page">
                <div className="past-nfts">
                    <div className="container">
                        <div className="text-container">

                            <h1>bonbon</h1>
                            <div dangerouslySetInnerHTML={{ __html: "MetaSafari’s gift to the Solana Community. Use this section to add your own introduction." }} />

                        </div>

                    </div>
                </div>

                <Grid container className={"nft-list"}>
                    {bonbonData.map((item) => (

                        <Grid item lg={4} md={4} sm={6} xs={12} key={item.title} onClick={() => selectItem(item)} className={`nft-images ${item.selected ? 'nft-selected' : ''}`}>
                            <div className={`nft-item${item.selected ? '-selected' : ''}`} >
                                <Grid container spacing={2} direction="row"
                                    alignItems="center"
                                    justifyContent="center">
                                    <Grid item xs={7} className="title_div">
                                        <p className="past-title">{item.main_title}</p>

                                    </Grid>
                                    <Grid item xs={4} >
                                        {remainingItems(item)}
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center" }}>
                                    <img
                                        src={`/${item.image_url}`} alt={item.main_title}
                                        loading="lazy"
                                        className="nftImage"
                                    />
                                </Grid>

                            </div>
                        </Grid>
                    ))
                    }
                </Grid>




                <div className="container">
                    <div className="progress-timer-wrap">
                        <MintButton
                            itemsRemaining={itemsRemaining}
                            itemsAvailable={itemsAvailable}
                            itemsRedeemed={itemsRedeemed}
                            wallet={wallet}
                            isSoldOut={false}
                            isMinting={isMinting}
                            onMint={mintSelected}
                            mintButtonActive={mintButtonActive}
                            timeUp={timeUp}
                        />
                    </div>
                </div>
                <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() => setAlertState({ ...alertState, open: false })}
                >
                    <Alert
                        onClose={() => setAlertState({ ...alertState, open: false })}
                        severity={alertState.severity}
                    >
                        {alertState.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default BonBonDrops
