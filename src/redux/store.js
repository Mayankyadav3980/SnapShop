import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";

// console.log(cartReducer, userReducer);

export const store = configureStore({
    
    reducer:{
        cartReducer: cartReducer,
        userReducer: userReducer,
    }
})
