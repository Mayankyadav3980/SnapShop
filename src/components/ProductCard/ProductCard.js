import React from "react";
import { useUserDetails } from "../../userContext";


const ProductCard = ({ details, addProductToCart, removeProductFromCart }) => {
   const { userDetails, setUserDetails } = useUserDetails();
  if(!details) return;
  const { id, name, des, price, category, stock, rating, img, tags, inCart } =
    details;
  // console.log(inCart);
  
 

  const handleAddToCart = () => {
    // console.log('inside handleAddToCart',userDetails, id);
    addProductToCart(id);
  };

  const handleRemoveFromCart = () => {
    removeProductFromCart(id);
  };

  return (
    <div className="card_cont">
      <div className="img_cont">
        <img src={img} height="100%" width="100%" />
      </div>
      <div className="card_body">
        <div className="rating">
          <p>{name.length > 20 ? name.substring(0, 20) + "..." : name}</p>
          <span> ⭐️ {rating}</span>
        </div>

        <p>${price}</p>
        {inCart ? (
          <button
            className="btn btn-light shop_btn"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </button>
        ) : (
          <button className="btn btn-light shop_btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
