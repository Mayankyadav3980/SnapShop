import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useCartItems } from "../../cartContext";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";

const Nav = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const { cartItems } = useCartItems();
  return (
    <>
      <nav>
        <h3 className="brand_name">CloudMart</h3>
        <div className="nav_items">
          {isUserLoggedIn && (
            <span className="item">
              <NavLink to="/home" className="nav_link">
                <FaHome />
                Home
              </NavLink>
            </span>
          )}

          {isUserLoggedIn && (
            <span className="item">
              <NavLink to="/cart" className="nav_link">
                <FaShoppingCart />
                Cart{" "}
              </NavLink>
              <span style={{ fontSize: "0.9rem" }}>
                {cartItems.length > 0 && cartItems.length}
              </span>
            </span>
          )}

          {!isUserLoggedIn && (
            <>
              <span className="item">
                <NavLink to="/" className="nav_link">
                  <AiOutlineLogin />
                  SignUp
                </NavLink>
              </span>

              <span className="item">
                <NavLink to="/signin" className="nav_link">
                  <BiLogIn />
                  SignIn
                </NavLink>
              </span>
            </>
          )}

          {isUserLoggedIn && (
            <span
              onClick={() => {
                setIsUserLoggedIn(false);
              }}
              className="nav_link item"
            >
              <BiLogOut />
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
