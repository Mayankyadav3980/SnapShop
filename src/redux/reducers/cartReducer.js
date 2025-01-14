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
import { toast } from "react-toastify";

const initialState = { cartItems: [] };

//gets the cart items form firestore
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const { uId } = state.userReducer.userDetails;
    const docRef = doc(db, "users", uId);
    onSnapshot(docRef, (doc) => {
      const cart = doc.data().cartItems;
      return thunkAPI.dispatch(cartActions.setState(cart));
    });
  }
);

//add product to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const uId = state.userReducer.userDetails.uId;
    const docRef = doc(db, "users", uId);
    const prdt = products.find((p) => p.id === payload.pId);
    await updateDoc(docRef, {
      cartItems: arrayUnion({ ...prdt, inCart: true, qty: 1 }),
    });
    toast.success("Product added to cart successfully");
  }
);

//removes product from cart
export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const cartItems = state.cartReducer.cartItems;
    const { uId } = state.userReducer.userDetails;

    const docRef = doc(db, "users", uId);
    const prdt = cartItems.find((p) => p.id === payload.pId);
    await updateDoc(docRef, {
      cartItems: arrayRemove(prdt),
    });
    toast.success("Product removed from cart successfully");
  }
);

//handles increase/ decrease of product quantity on user click
export const handleProductQuantity = createAsyncThunk(
  "cart/handleProductQuantity",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const { cartItems } = state.cartReducer;
    const { uId } = state.userReducer.userDetails;

    const prdtIndex = cartItems.findIndex((p) => p.id === payload.pId);
    const prdt = cartItems[prdtIndex];
    let newCart = [...cartItems];
    let newPrdt = prdt;
    if (payload.opt === "inc") {
      newPrdt = { ...prdt, qty: prdt.qty + 1 };
    } else if (prdt.qty > 1) {
      newPrdt = { ...prdt, qty: prdt.qty - 1 };
    }
    newCart.splice(prdtIndex, 1, newPrdt);

    const docRef = doc(db, "users", uId);
    await updateDoc(docRef, {
      cartItems: newCart,
    });
  }
);

//handles cart items on successfull purchase
export const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const uId = state.userReducer.userDetails.uId;
    const docRef = doc(db, "users", uId);
    await updateDoc(docRef, {
      cartItems: [],
    });
    toast.success("Your order was placed successfully, Thanks!");
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {});

    builder
      .addCase(handleProductQuantity.fulfilled, (state, action) => {
        console.log("qty successfully updated", action.payload);
      })
      .addCase(handleProductQuantity.rejected, (state, action) => {
        console.log("qty update rejected");
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
