import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
// import { useCartItems } from "../../cartContext";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, addProductToCart, handleProductQuantity } from "../../redux/reducers/cartReducer";

const ProductCard = ({ details }) => {
  const dispatch = useDispatch();

  if (!details) return;
  const { id, name, price, rating, img, inCart, qty } = details;

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

        <div className="price">
          <p>${price}</p>
          {inCart && (
            <div className="prdt_count">
              <GrSubtractCircle
                onClick={() =>
                  dispatch(handleProductQuantity({ opt: "dec", pId: id }))
                }
                className="inc_icon"
              />
              <p>{qty}</p>
              <IoMdAddCircleOutline
                onClick={() =>
                  dispatch(handleProductQuantity({ opt: "inc", pId: id }))
                }
                className="inc_icon"
              />
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          {inCart ? (
            <button
              className="btn btn-light shop_btn"
              onClick={() => dispatch(removeProductFromCart({ pId: id }))}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="btn btn-light shop_btn"
              onClick={() => {dispatch(addProductToCart({ pId: id }));}
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
