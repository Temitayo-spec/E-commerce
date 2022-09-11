/* eslint-disable @next/next/no-img-element */
import styles from "../styles/FooterBanner.module.css";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  banner: {
    Discount,
    BigText,
    SmallText,
    MidText,
    description,
    buttonText,
    image,
    product,
    SaleTime,
  },
}) => {
  return (
    <div className={styles.footer__banner__ctn}>
      <div className={styles.banner__desc}>
        <div className={styles.lhs}>
          <p>{Discount}</p>
          <h3>{BigText}</h3>
          <h3>SMILE</h3>
          <p>{SaleTime}</p>
        </div>
        <div className={styles.rhs}>
          <p>{SmallText}</p>
          <h3>{MidText}</h3>
          <p>{description}</p>
          <Link href={product ? `/product/${product}` : "/"}>
            <button className={styles.btn} type="button">
              {buttonText}
            </button>
          </Link>
        </div>
        <img
          src={urlFor(image)}
          alt=""
          className={styles.footer__banner__img}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
