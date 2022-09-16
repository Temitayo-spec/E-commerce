import styles from "../styles/Success.module.css";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useCart } from "../func/functions";
import { useEffect } from "react";
import { createConfetti, frame } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalItems, setTotalPrice } = useCart();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    createConfetti();
    //   frame();
  }, []);

  return (
    <div className={styles.success__wrapper}>
      <div className={styles.success}>
        <div className={styles.icon}>
          <BsBagCheckFill />
        </div>
        <h2>Thank you for your order!</h2>
        <p className={styles.email__msg}>
          Check your email for order confirmation.
        </p>
        <p className={styles.description}>
          If you have any questions, please contact us at
          <a className={styles.email} href="mailto:olawanletemitayo@gmail.com">
            olawanletemitayo@gmail
          </a>
        </p>
        <Link href="/">
          <button className={styles.btn} type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
