import { useState } from 'react';

import Link from "next/link";
import HeaderNav from './HeaderNav';
function Header() {

    const [menuActive, setMenuActive] = useState(false);
    const menuToggle = () => {
        setMenuActive(!menuActive)
    }
    return (
        <header className="header">
            <div className="header-container">
                <Link href="/">
                    <img  src="/bonbon_logo.svg" alt="Logo" />
                </Link>
                <HeaderNav isActive={menuActive} />
                <div className="hamburger" onClick={menuToggle}>
                    <span></span><span></span><span></span>
                </div>
            </div>
        </header>
    )
}

export default Header
