import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";

const Nav = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  return (
    <>
      <nav>
        <h3 className="brand_name">SnapShop</h3>
        <div className="nav_items">
          {isUserLoggedIn && (
            <span className="item">
              <NavLink to="/home" className="nav_link">
                <FaHome className="nav_icon" />
                Home
              </NavLink>
            </span>
          )}

          {isUserLoggedIn && (
            <span className="item">
              <NavLink to="/cart" className="nav_link">
                <span className="nav_icon">
                  <FaShoppingCart />
                  <span style={{ fontSize: "0.9rem" }}>
                    {cartItems.length > 0 && cartItems.length}
                  </span>
                </span>
                Cart{" "}
              </NavLink>
            </span>
          )}

          {!isUserLoggedIn && (
            <>
              <span className="item">
                <NavLink to="/" className="nav_link">
                  <AiOutlineLogin className="nav_icon" />
                  SignUp
                </NavLink>
              </span>

              <span className="item">
                <NavLink to="/signin" className="nav_link">
                  <BiLogIn className="nav_icon" />
                  SignIn
                </NavLink>
              </span>
            </>
          )}

          {isUserLoggedIn && (
            <span
              onClick={() => {
                setIsUserLoggedIn(false);
                toast.success("Signed out successfully");
              }}
              className="nav_link item"
            >
              <BiLogOut className="nav_icon" />
              SignOut
            </span>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
