import React from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form_container}>
        <h2 className={styles.heading}>SignUp Form</h2>
        <input placeholder="email" />
        <input placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
