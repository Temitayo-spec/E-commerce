import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className={styles.navbar__ctn}>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <a>TM Headphones</a>
        </Link>
      </div>

      <button type="button" className={styles.cart__icon}>
        <AiOutlineShoppingCart />
        <span className={styles.cart__item__qty}>1</span>
      </button>
    </div>
  );
};

export default Navbar;
