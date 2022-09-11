/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "../styles/Banner.module.css";

import { urlFor } from "../lib/client";

const Banner = ({ banner }) => {
  return (
    <div className={styles.banner__ctn}>
      <div className={styles.banner__inner}>
        <p className={styles.beats__solo}>{banner.SmallText}</p>
        <h3 className={styles.mid__text}>{banner.MidText}</h3>
        <h1>{banner.BigText}</h1>
        <img src={urlFor(banner.image)} alt="" className={styles.banner__img} />

        <div className={styles.contents}>
          <Link href={`/product/${banner._id}`}>
            <button type="button" className={styles.banner__link}>
              {banner.buttonText}
            </button>
          </Link>

          <div className={styles.description}>
            <h5>Description</h5>
            <p>{banner.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
