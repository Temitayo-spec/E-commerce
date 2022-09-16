/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useCart } from "../func/functions";
import { urlFor } from "../lib/client";
import { getStripe } from "../lib/getSripe";
import { useRef } from "react";

const Cart = () => {
  const cartRef = useRef();
  const {
      cartItems,
      setShowCart,
      totalItems,
      totalPrice,
      toggleCartItemQuantity,
      removeFromCart,
    } = useCart(),
    handleCheckOut = async () => {
      const stripe = await getStripe();

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();

      toast.loading("Redirecting to checkout...");

      stripe.redirectToCheckout({
        sessionId: data.id,
      });
    };

  return (
    <div className={styles.cart__wrapper} ref={cartRef}>
      <div className={styles.cart__ctn}>
        <button
          onClick={() => setShowCart(false)}
          type="button"
          className={styles.cart__close}
        >
          <AiOutlineLeft />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles.cart__num__items}>({totalItems} items)</span>
        </button>

        {cartItems.length === 0 && (
          <div className={styles.cart__empty}>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button
                onClick={() => setShowCart(false)}
                type="button"
                className={styles.cart__empty__btn}
              >
                <a>Continue Shopping</a>
              </button>
            </Link>
          </div>
        )}

        <div className={styles.product__ctn}>
          {
            // Loop through the cart items
            cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className={styles.product} key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    alt=""
                    className={styles.product__img}
                  />
                  <div className={styles.product__info}>
                    <div className={styles.top}>
                      <h5 className={styles.product__name}>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className={styles.bottom}>
                      <div className={styles.qty__ctn}>
                        <div className={styles.quantity__desc}>
                          <span
                            onClick={() => {
                              toggleCartItemQuantity(item._id, "decrement");
                            }}
                            className={styles.minus}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className={styles.num}>
                            {
                              // Get the quantity of the item
                              item.qty
                            }
                          </span>
                          <span
                            onClick={() => {
                              toggleCartItemQuantity(item._id, "increment");
                            }}
                            className={styles.plus}
                          >
                            <AiOutlinePlus />
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.delete__btn}
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success("Item removed from cart");
                        }}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
        {
          // If there are items in the cart, show the checkout button
          cartItems.length >= 1 && (
            <div className={styles.checkout__ctn}>
              <div className={styles.total}>
                <h4>Subtotal:</h4>
                <h3>${totalPrice}</h3>
              </div>
              <div className={styles.btn__ctn}>
                <button
                  onClick={handleCheckOut}
                  type="button"
                  className={styles.checkout__btn}
                >
                  Pay with stripe
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
