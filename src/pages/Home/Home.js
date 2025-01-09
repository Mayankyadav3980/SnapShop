import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data";
// import { useCartItems } from "../../cartContext";
import { useDispatch } from "react-redux";
import { getCartItems, isProductInCart } from "../../redux/reducers/cartReducer";

const Home = () => {
  // const { getCartItems, isProductInCart } = useCartItems();
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(getCartItems());
  }, []);

  return (
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
  );
};

export default Home;
