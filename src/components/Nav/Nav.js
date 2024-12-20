import React from "react";
import styles from "./Nav.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { useCartItems } from "../../cartContext";

const Nav = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const { cartItems } = useCartItems();
  return (
    <>
      <nav>
        <h3 className={styles.brand_name}>CloudMart</h3>
        <div className={styles.nav_items}>
          {isUserLoggedIn && (
            <span className={styles.item}>
              <NavLink to="/home">Home</NavLink>
            </span>
          )}

          {isUserLoggedIn && (
            <span className={styles.item}>
              <NavLink to="/cart">Cart </NavLink>
              {cartItems.length}
            </span>
          )}

          {isUserLoggedIn && <span className={styles.item}>Orders</span>}

          <span className={styles.item}>
            <NavLink to="/signin">SignIn</NavLink>
          </span>

          {isUserLoggedIn && (
            <span
              className={styles.item}
              onClick={() => {
                setIsUserLoggedIn(false);
              }}
            >
              SignOut
            </span>
          )}

          <span className={styles.item}>
            <NavLink to="/">SignUp</NavLink>
          </span>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
