import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "../components";
import { useCart } from "../func/functions";

const Navbar = () => {
  const { showCart, setShowCart, totalItems } = useCart();
  return (
    <div className={styles.navbar__ctn}>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <a>TM Headphones</a>
        </Link>
      </div>

      <button onClick={setShowCart} type="button" className={styles.cart__icon}>
        <AiOutlineShoppingCart />
        <span className={styles.cart__item__qty}>{totalItems}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
