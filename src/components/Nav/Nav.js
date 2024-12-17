import React from 'react'
import styles from './Nav.module.css'
import { Outlet } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav>
        <h3 className={styles.brand_name}>CloudMart</h3>
        <div className={styles.nav_items}>
          <span className={styles.item}>Home</span>
          <span className={styles.item}>Cart</span>
          <span className={styles.item}>Orders</span>
          <span className={styles.item}>LogIn</span>
          <span className={styles.item}>LogOut</span>
          <span className={styles.item}>SignUp</span>
        </div>
      </nav>
      <Outlet/>
    </>
  );
}

export default Nav