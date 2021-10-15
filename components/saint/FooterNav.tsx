import React from 'react'
import Link from 'next/link'

function FooterNav() {
    return (
        <nav className="footer-nav">
            <div className="footerlogo-container">
            <Link href="/">
                    <img  src="/bonbon_footer.svg" alt="Logo" />
                </Link>
                </div>   <div className="footer-container">
              <h3> <Link   href="/"><a className="active">bonbon</a></Link> is lovingly powered by:</h3>
            </div>
            <div className="footer-container">
         
            <Link   href="https://metasafari.world/"><a className="active">Metasafari</a></Link>
            <Link   href="https://metasafari.world/"><a className="active">Wildlife Park</a></Link>
            <Link   href="https://solana.com/"><a className="active">Solana</a></Link>
            <Link   href="https://metaplex.com/"><a className="active">Metaplex</a></Link>
            <Link   href="https://hackmd.io/@levicook/HJcDneEWF"><a className="active">Candy Machine</a></Link>
            <Link   href="https://phantom.app/"><a className="active">Phantom</a></Link>

            </div>
        </nav>
    )
}

export default FooterNav
