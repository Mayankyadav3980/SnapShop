import React from 'react'
import styles from './Nav.module.css'
import { Outlet, NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav>
        <h3 className={styles.brand_name}>CloudMart</h3>
        <div className={styles.nav_items}>
          <span className={styles.item}>
            <NavLink to="/home">Home</NavLink>
          </span>
          <span className={styles.item}>
            <NavLink to="/cart">Cart</NavLink>
          </span>
          <span className={styles.item}>Orders</span>
          <span className={styles.item}>
            <NavLink to="/signin">LogIn</NavLink>
          </span>
          <span className={styles.item}>LogOut</span>
          <span className={styles.item}>
            <NavLink to="/">SignUp</NavLink>
          </span>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav