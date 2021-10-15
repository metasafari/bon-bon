import React from 'react'
import Link from 'next/link'

function FooterNav() {
    return (
        <nav className="footer-nav">
            <div className="footerlogo-container">
            <Link href="/">
                    <img  src="/bonbon_footer.svg" alt="Logo" />
                 
                </Link>
                </div>   
            <div className="footertext-container">
            <h3><Link   href="/"><a className="active">bonbon</a></Link> is lovingly powered by:</h3>
            </div>
            <div className="footer-container">
         
            <Link   href="https://metasafari.world/"><a className="active" target="_blank">Metasafari</a></Link>
            <Link   href="https://metasafari.world/"><a className="active" target="_blank">Wildlife Park</a></Link>
            <Link   href="https://solana.com/"><a className="active" target="_blank">Solana</a></Link>
            <Link   href="https://metaplex.com/"><a className="active" target="_blank">Metaplex</a></Link>
            <Link   href="https://hackmd.io/@levicook/HJcDneEWF" target="_blank"><a className="active">Candy Machine</a></Link>
            <Link   href="https://phantom.app/"><a className="active" target="_blank">Phantom</a></Link>

            </div>
        </nav>
    )
}

export default FooterNav
