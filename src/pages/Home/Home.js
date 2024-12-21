import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data";
import { useUserDetails } from "../../userContext";
import { useCartItems } from "../../cartContext";
import { db } from "../../firebaseInit";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

const Home = () => {
  const {
    cartItems,
    setCartItems,
    getCartItems,
    addProductToCart,
    removeProductFromCart,
    isProductInCart
  } = useCartItems();

  const { userDetails, setUserDetails } = useUserDetails();
  const { uId } = userDetails;

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className=" home_container">
      <div className=" container cards_container">
        {products.map((p, idx) => {
          const cartPrdt = isProductInCart(p);
          
          return (
            <>
              {cartPrdt ? (
                <ProductCard
                  key={idx}
                  details={cartPrdt}
                />
              ) : (
                <ProductCard
                  key={idx}
                  details={p}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
