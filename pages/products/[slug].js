/* eslint-disable @next/next/no-img-element */
import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/ProductDetails.module.css";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useState } from "react";
import { useCart } from "../../func/functions";

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);

  const products = await client.fetch(productQuery);
  return {
    props: {
      products,
      product,
    },
  };
};

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { qty, incrementQty, decrementQty, addToCart, onBuyNow } = useCart();
  return (
    <div className={styles.product__details__ctn}>
      <div className={styles.product__details__inner}>
        <div className={styles.lhs}>
          <div className={styles.image__ctn}>
            <img
              src={urlFor(image && image[index])}
              alt=""
              className={styles.product__detail__image}
            />
          </div>
          <div className={styles.small__images__ctn}>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                alt=""
                className={
                  index === i
                    ? `${styles.small__img} ${styles.selected__image}`
                    : styles.small__img
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rhs}>
          <h1>{name}</h1>
          <div className={styles.reviews}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={styles.price}>${price}</p>
          <div className={styles.quantity}>
            <h3>Quantity: </h3>
            <div className={styles.quantity__desc}>
              <span
                onClick={() => {
                  if (qty > 1) {
                    decrementQty();
                  }
                }}
                className={styles.minus}
              >
                <AiOutlineMinus />
              </span>
              <span className={styles.num}>{qty}</span>
              <span
                onClick={() => {
                  if (qty < 10) {
                    incrementQty();
                  }
                }}
                className={styles.plus}
              >
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.add__to__cart}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={styles.buy__now}
              onClick={() => onBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <section className={styles.maylike__products__wrapper}>
        <h2>You may also like</h2>

        <div className={styles.marquee}>
          <div className={`${styles.maylike__products__ctn} ${styles.track}`}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
