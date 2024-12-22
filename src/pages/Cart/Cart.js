import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCartItems } from "../../cartContext";

const Cart = () => {
  const { cartItems, getCartItems, emptyCart } = useCartItems();
    useEffect(() => {
      getCartItems();
    }, []);
  const len = cartItems.length;
  let totalAmount = 0;
  if (len) {
    totalAmount = cartItems.reduce((acc, prdt) => {
      return acc + prdt.price * prdt.qty;
    }, 0);
  }

  const handleBuy = () => {
    emptyCart();
    alert('Your Purchase was completed, Thanks');
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
            Total Amount: ${Math.round(totalAmount)}
            <button className="buy_btn" onClick={handleBuy}>Buy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
