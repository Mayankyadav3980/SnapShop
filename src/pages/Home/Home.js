import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../redux/reducers/cartReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  //checking if product displayed on homepage is in user's cart or not
  const isProductInCart = (prdt) => {
    const product = cartItems.find((p) => p.id === prdt.id);
    return product;
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <>
      <div className=" home_container">
        <div className=" container cards_container">
          {products.map((p, idx) => {
            const cartPrdt = isProductInCart(p);

            return (
              <>
                {cartPrdt ? (
                  <ProductCard key={idx} details={cartPrdt} />
                ) : (
                  <ProductCard key={idx} details={p} />
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
