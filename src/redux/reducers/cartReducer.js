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
// import { store } from "../store";
import { useSelector } from "react-redux";

const initialState = { cartItems: [] };
// const GetId = ()=>{
// const userDetails = useSelector(state =>state.userDetails);
// console.log("userD", userDetails);
// uId= userDetails.uId;
// }
// GetId();

// const state = store.getState();
// const { uId } = state.userSlice.userDetails;
// const uId = null;

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (payload, thunkAPI) => {
    // console.log('uid',uId);

    const state = thunkAPI.getState();
    const {uId} = state.userReducer.userDetails;
    const docRef = doc(db, "users", uId);
    onSnapshot(docRef, (doc) => {
      const cart = doc.data().cartItems;
      return thunkAPI.dispatch(cartActions.setState(cart));
    });
  }
);
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
  }
);
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
  }
);
export const handleProductQuantity = createAsyncThunk(
  "cart/handleProductQuantity",
  async (payload, thunkAPI) => {
    console.log('inside hpq');
    
    const state = thunkAPI.getState();
    console.log("state:",state);
    const {cartItems} = state.cartReducer;
    const { uId } = state.userReducer.userDetails;
    console.log(cartItems, uId);

    const docRef = doc(db, "users", uId);
    const prdtIndex = cartItems.findIndex((p) => p.id === payload.pId);
    const prdt = cartItems[prdtIndex];
    let newCart = cartItems;
    let newPrdt = prdt;

    if (payload.opt === "inc") newPrdt = { ...prdt, qty: prdt.qty + 1 };
    else if (prdt.qty > 1) newPrdt = { ...prdt, qty: prdt.qty - 1 };

    newCart.splice(prdtIndex, 1, newPrdt);
    try{
       const res = await updateDoc(docRef, {
      cartItems: newCart,
    });
    }catch(e){
      console.log('qty update req failed:', e);
      
    }
   
    // return thunkAPI.fulfillWithValue(res);
    // return res;
  }
);
export const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const uId = state.userReducer.userDetails.uId;
    const docRef = doc(db, "users", uId);
    await updateDoc(docRef, {
      cartItems: [],
    });
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
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      // state.cartItems = action.payload;
      // console.log("in extraReducer", action);
    });

    builder.addCase(handleProductQuantity.fulfilled, (state, action) => {
      console.log("qty successfully updated");
    }).addCase(handleProductQuantity.rejected, (state, action)=>{
      console.log('qty update rejected');
      
    });
  },
});

// console.log("cartSice:", cartSlice.reducer);

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
