import styles from "../styles/Layout.module.css";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout__ctn}>
      <Head>
        <title>Next.js Ecommerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header__ctn}>
        <Navbar />
      </header>

      <main className={styles.main__ctn}>{children}</main>

      <footer className={styles.footer__ctn}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
