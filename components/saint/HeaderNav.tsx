import Link from 'next/link'
import { useRouter } from "next/router";
function HeaderNav({isActive}:any) {
    const router = useRouter();
    return (
        <nav className={`header-nav ${isActive ? 'active': ''}`}>
        {/* <Link   href="/"><a className={router.pathname=="/" ? 'active': ''}>Candy Store </a></Link> */}
        </nav>
    )
}

export default HeaderNav
