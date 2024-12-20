import { createContext, useContext, useState } from "react";
import { useUserDetails } from "./userContext";
import { products } from "./data";

import { db } from "./firebaseInit";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const cartContext = createContext();

export const useCartItems = () => {
  const value = useContext(cartContext);
  // console.log(value);

  return value;
};

export const CustomCartContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userDetails, setUserDetails } = useUserDetails();
  const { uId } = userDetails;

  const removeProductFromCart = async (pId) => {
    // console.log("inremoveProductFromCart", pId);

     const prdtIdx = products.findIndex(p=>p.id === pId);
        const prdt = products.find(p=>p.id === pId);
        products[prdtIdx] = {...prdt, inCart:false}; 

    //now removing the product from user account in cloud firestore
    let docRef = doc(db, "users", uId);
    await updateDoc(docRef, {
      cartItems: arrayRemove(prdt)
    });
  };

  return (
    <cartContext.Provider
      value={{ cartItems, setCartItems, removeProductFromCart }}
    >
      {children}
    </cartContext.Provider>
  );
};
