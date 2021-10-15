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

function ProgressBar(props: ProgressBarProps) {
    const { itemsRemaining, itemsAvailable, itemsRedeemed, wallet, isSoldOut, isMinting, onMint, mintButtonActive, timeUp } = props;
    const [minProgress, setMintProgress] = useState('')
    const minClaimedPerc = () => setMintProgress(itemsRedeemed / itemsAvailable * 100 + '%');
    useEffect(() => {
        minClaimedPerc()
    }, [itemsAvailable, itemsRedeemed, itemsRemaining]);
    return (
        <div className="progressbar">
            {(wallet.connected && mintButtonActive) &&
                <>
                    <div className="label">
                        <span>Claimed</span>
                        <span>{itemsRemaining} remaining</span>
                    </div>
                    <div className="progressbar-item">
                        <div className="progressbar-inner" style={{ ['--progress' as string]: minProgress }}></div>
                    </div>
                </>
            }

            {!wallet.connected ?
                <WalletDialogButton>Connect Wallet</WalletDialogButton> :
                <button
                    className={(timeUp || !mintButtonActive || isSoldOut || isMinting) ? 'disabled' : ''}
                    onClick={onMint}>
                        {!mintButtonActive ? "DON'T MISS OUT" : 
                        isSoldOut ? ("SOLD OUT") : isMinting ? 'Loading' : 'Mint NFT'}
                </button>}
        </div>

    )
}

export default ProgressBar
