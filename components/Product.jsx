/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/client";
import styles from "../styles/Product.module.css";

const Product = ({ product: { name, slug, image, price } }) => {
  return (
    <Link href={`/products/${slug.current}`}>
      <div className={styles.product__card}>
        <div className={styles.product__image_ctn}>
          <img
            src={urlFor(image && image[0])}
            alt={name}
            className={styles.product__image}
            width={250}
            height={250}
          />
        </div>
        <p className={styles.product__name}>{name}</p>
        <p className={styles.product__price}>${price}</p>
      </div>
    </Link>
  );
};

export default Product;
