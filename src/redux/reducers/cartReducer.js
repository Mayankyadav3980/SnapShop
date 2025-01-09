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
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const uId = state.userReducer.userDetails.uId;
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
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const cartItems = state.cart.cartItems;

    const docRef = doc(db, 'users', payload.uId);
    const prdtIndex = cartItems.findIndex(p => p.id === payload.pId);
    const prdt = cartItems[prdtIndex];
    let newCart = cartItems;
    let newPrdt = prdt;

    if(payload.opt === 'inc') newPrdt = { ...prdt, qty: prdt.qty + 1};
    else if (prdt.qty > 1) newPrdt = { ...prdt, qty: prdt.qty -1};

    newCart.splice(prdtIndex, 1, newPrdt);

    const res = await updateDoc(docRef, {
      cartItems: newCart,
    });
    return res;
  }
);
export const emptyCart = createAsyncThunk("cart/emptyCart", async (payload) => {
   const docRef = doc(db, "users", payload.uId);
   await updateDoc(docRef, {
     cartItems: [],
   });
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    isProductInCart: (state, action) => {
      const product = state.cartItems.find(p=>p.id === action.payload.id);
      return product;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      console.log("in extraReducer");
    });

    builder.addCase(handleProductQuantity.fulfilled, (state, action)=>{
      console.log('qty successfully updated');
      
    })
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions