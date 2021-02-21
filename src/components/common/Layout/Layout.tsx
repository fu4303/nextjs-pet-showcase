import Head from 'next/head';
import { FC } from 'react';
import Navbar from '../Navbar';
import styles from './Layout.module.css';

const Layout: FC = ({ children }) => {
    return (
        <>
            <Head>
                <title>PawShow | Show your pet to the world.</title>
            </Head>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </>
    );
};

export default Layout;