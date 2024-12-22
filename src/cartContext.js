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
  onSnapshot,
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
  const docRef = doc(db, "users", "0asumb2UF9QPaiwrb63SsgQHAx02");

  //getting realtime updates of cart items
  const getCartItems = () => {
    onSnapshot(docRef, (doc) => {
      let cart = doc.data().cartItems;
      setCartItems(cart);
    });
  };

  //adding  product to user account in cloud firestore
  const addProductToCart = async (pId) => {
    const prdt = products.find((p) => p.id === pId);
    // const prdt = products[prdtIdx];

    // products[prdtIdx] = { ...prdt, qty: 1 };
    await updateDoc(docRef, {
      cartItems: arrayUnion({ ...prdt, inCart: true, qty:1 }),
    });
  };

  //removing product from user account in cloud firestore
  const removeProductFromCart = async (pId) => {
    const prdt = cartItems.find((p) => p.id === pId);
    
    await updateDoc(docRef, {
      cartItems: arrayRemove(prdt),
    });
  };

  const isProductInCart = (prdt) => {
    const product = cartItems.find((p) => p.id === prdt.id);
    return product;
  };

  //handling increase and decrease of product qty
  const handleProductQuantity = async (opt, pId) => {
    const prdtIndex = cartItems.findIndex((p) => p.id === pId);
    const prdt = cartItems[prdtIndex];
    
    let newCart = cartItems;
    let newPrdt = prdt;

    if (opt === "inc") 
      newPrdt = { ...prdt, qty: prdt.qty + 1 };
    else 
      if (prdt.qty > 1) newPrdt = { ...prdt, qty: prdt.qty - 1 };
    
    newCart.splice(prdtIndex, 1, newPrdt);

    await updateDoc(docRef, {
      cartItems: newCart,
    });
  };

  const emptyCart = async() => {
     await updateDoc(docRef, {
       cartItems: [],
     });
  }

  return (
    <cartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getCartItems,
        addProductToCart,
        removeProductFromCart,
        isProductInCart,
        handleProductQuantity,
        emptyCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
