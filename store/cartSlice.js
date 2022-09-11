import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalItems: 0,
    qty: 1,
  },
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setQty: (state, action) => {
      state.qty = action.payload;
    },
  },
});

export const {
  toggleCart,
  setCartItems,
  setTotalPrice,
  setTotalItems,
  setQty,
} = cartSlice.actions;

export const selectShowCart = (state) => state.cart.showCart;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectQty = (state) => state.cart.qty;

export const cartReducer = cartSlice.reducer;
