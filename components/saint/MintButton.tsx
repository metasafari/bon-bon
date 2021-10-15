import React, { MouseEventHandler, useEffect, useState } from 'react'

import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

interface ProgressBarProps {
    itemsRemaining: number;
    itemsAvailable: number;
    itemsRedeemed: number;
    wallet: any;
    isSoldOut: boolean;
    isMinting: boolean;
    onMint: MouseEventHandler<HTMLButtonElement>;
    mintButtonActive: boolean;
    timeUp: boolean;
}

function MintButton(props: ProgressBarProps) {
    const { itemsRemaining, itemsAvailable, itemsRedeemed, wallet, isSoldOut, isMinting, onMint, mintButtonActive, timeUp } = props;
    const [minProgress, setMintProgress] = useState('')
    const minClaimedPerc = () => setMintProgress(itemsRedeemed / itemsAvailable * 100 + '%');
    useEffect(() => {
        minClaimedPerc()
    }, [itemsAvailable, itemsRedeemed, itemsRemaining]);
    return (
        <div className="progressbar">   
            {!wallet.connected ?
                <WalletDialogButton>Connect Wallet</WalletDialogButton> :
                <button
                    className={(timeUp || !mintButtonActive || isSoldOut || isMinting) ? 'disabled' : ''}
                    onClick={onMint}>
                        {!mintButtonActive ? "SELECT NFT" : 
                        isSoldOut ? ("SOLD OUT") : isMinting ? 'Loading' : 'Mint NFTs'}
                </button>}
        </div>

    )
}

export default MintButton
