import styles from "../styles/Footer.module.css";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.footer__ctn}>
      <p>2022 TM Headphones. © Copyrights reserved.</p>
      <div className={styles.social__links}>
        <a href="https://www.instagram.com/">
          <AiFillInstagram className={styles.icon} />
        </a>
        <a href="https://twitter.com/">
          <AiOutlineTwitter className={styles.icon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
