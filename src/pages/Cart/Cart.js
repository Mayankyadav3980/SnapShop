import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCartItems } from "../../cartContext";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/reducers/cartReducer";
import { getCartItems, addProductToCart, removeProductFromCart, handleProductQuantity, emptyCart } from "../../redux/reducers/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cartReducer)
  // const { cartItems, getCartItems, emptyCart } = useCartItems();

  //fetches all the products in the user's cart from firestore at component mount
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const len = cartItems.length;
  let totalAmount = 0;
  if (len) {
    totalAmount = cartItems.reduce((acc, prdt) => {
      return acc + prdt.price * prdt.qty;
    }, 0);
  }

  //emptys the cart on successful checkout
  const handleBuy = () => {
    dispatch(emptyCart());
    alert("Your Purchase was completed, Thanks");
  };

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
            <button className="buy_btn" onClick={handleBuy}>
              Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
