import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import Header from '../components/saint/header';
import Footer from '../components/saint/Footer';
import Head from "next/head";
require('../styles/App.scss');

const WalletConnectionProvider = dynamic(() => import('../components/WalletConnectionProvider'), {
    ssr: false,
});

function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>

            <Header />
            <WalletConnectionProvider>

                <Component {...pageProps} />

            </WalletConnectionProvider>
            <Footer />
        </>
    );
}

export default App;