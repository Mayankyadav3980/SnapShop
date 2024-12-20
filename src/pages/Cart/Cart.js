import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCartItems } from "../../cartContext";

const Cart = () => {

  //initially cartItems is an empty array
  const { cartItems, removeProductFromCart } = useCartItems();
//   console.log('inside card component ',removeProductFromCart);
  

  return (
    <div className="container cart_cont">
      {cartItems.map((p, idx) => (
        <ProductCard
          key={idx}
          details={p}
          removeProductFromCart={removeProductFromCart}
        />
      ))}
    </div>
  );
};

export default Cart;
