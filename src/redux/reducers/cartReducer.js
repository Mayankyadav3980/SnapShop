import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { products } from "../../data";

const initialState = { cartItems: [] };

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (args) => {
    const docRef = doc(db, "users", uId);
    onSnapshot(docRef, (doc) => {
      const cart = doc.data().cartItems;
      return cart; 
    });
  }
);
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (payload) => { // send userId and productId with thunk action
    const docRef = doc(db, "users", payload.uId);
    const prdt = products.find((p) => p.id === payload.pId);
    await updateDoc(docRef, {
      cartItems: arrayUnion({ ...prdt, inCart: true, qty: 1 }),
    });
  }
);
export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (payload, thunkAPI) => {
    
    const state = thunkAPI.getState();
    const cartItems = state.cart.cartItems;

    const docRef = doc(db, "users", payload.uId);
    const prdt = cartItems.find((p) => p.id === payload.pId);
    await updateDoc(docRef, {
      cartItems: arrayRemove(prdt),
    });
  }
);
export const handleProductQuantity = createAsyncThunk(
  "cart/handleProductQuantity",
  async (args) => {}
);
export const emptyCart = createAsyncThunk("cart/emptyCart", async (args) => {});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    isProductInCart: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      console.log("in extraReducer");
    });
  },
});
