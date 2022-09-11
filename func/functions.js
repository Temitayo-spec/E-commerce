import {
  setCartItems,
  setTotalPrice,
  setTotalItems,
  setQty,
  toggleCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalItems,
  selectQty,
  selectShowCart,
} from "../store/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const qty = useSelector(selectQty);
  const showCart = useSelector(selectShowCart);

  let foundProduct;
  let index;

  const incrementQty = () => {
    dispatch(setQty(qty + 1));
  };

  const decrementQty = () => {
    if (qty - 1 < 1) {
      return;
    } else {
      dispatch(setQty(qty - 1));
    }
  };

  const addToCart = (product) => {
    const item = cartItems.find((item) => item._id === product._id);
    if (item) {
      dispatch(
        setCartItems(
          cartItems.map((item) =>
            item._id === product._id ? { ...item, qty: item.qty + qty } : item
          )
        )
      );
    } else {
      dispatch(setCartItems([...cartItems, { ...product, qty: qty }]));
    }
    dispatch(setTotalItems(totalItems + qty));
    dispatch(setTotalPrice(totalPrice + product.price * qty));
    // dispatch(setQty(1));
    toast.success(`${qty} ${product.name} added to cart`);
    dispatch(toggleCart());
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (foundProduct.qty >= 1 && value === "decrement") {
      dispatch(
        setCartItems(
          cartItems.map((item) =>
            item._id === id ? { ...item, qty: item.qty - 1 } : item
          )
        )
      );
      dispatch(setTotalItems(totalItems - 1));
      dispatch(setTotalPrice(totalPrice - foundProduct.price));
    } else {
      dispatch(
        setCartItems(
          cartItems.map((item) =>
            item._id === id ? { ...item, qty: item.qty + 1 } : item
          )
        )
      );
      dispatch(setTotalItems(totalItems + (value === "increment" ? 1 : -1)));
      dispatch(
        setTotalPrice(
          totalPrice + foundProduct.price * (value === "increment" ? 1 : -1)
        )
      );
    }
  };

  const removeFromCart = (id) => {
    const item = cartItems.find((item) => item._id === id);
    dispatch(setCartItems(cartItems.filter((item) => item._id !== id)));
    dispatch(setTotalItems(totalItems - item.qty));
    dispatch(setTotalPrice(totalPrice - item.price * item.qty));
    toast.error(`${item.name} removed from cart`);
  };

  const setShowCart = () => {
    dispatch(toggleCart());
  };

  return {
    cartItems,
    totalPrice,
    totalItems,
    qty,
    showCart,
    incrementQty,
    decrementQty,
    addToCart,
    setShowCart,
    toggleCartItemQuantity,
    removeFromCart,
  };
};