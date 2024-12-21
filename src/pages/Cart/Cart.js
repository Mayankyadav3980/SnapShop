import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCartItems } from "../../cartContext";

const Cart = () => {
  const { cartItems } = useCartItems();
  const len = cartItems.length;
   const totalAmount=0;
  if(len){
    //  totalAmount = cartItems.reduce()
  }

  return (
    <div className="container cart_cont">
      {!len ? (
        <h1> Your cart is empty!!</h1>
      ) : (
        <div className=" inner_cart_cont">
          <div className="cart_card_container">
            {cartItems.map((p, idx) => (
              <ProductCard key={idx} details={p} />
            ))}
          </div>
          <div className="checkout_div">
            Total Amount: {totalAmount}
            <button>Buy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
