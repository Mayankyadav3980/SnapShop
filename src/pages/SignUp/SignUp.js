import React, { useState, useRef } from "react";
// import styles from "./SignUp.module.css";

const SignUp = () => {
  const [signUpDetail, setSignUpDetail] = useState({
    email:'',
    password:''
  })

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(emailRef.current.value, passwordRef.current.value);
    
    setSignUpDetail({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }
  return (
    <div className="form_wrapper">
      <form className="form_container" onSubmit={handleSubmit}>
        <h2 className="heading">SignUp Form</h2>
        <input type='email' placeholder="email" name="email" id="email" ref={emailRef} required />
        <input type="password" placeholder="password" name="password" id="password" ref={passwordRef} required />
        <button type="submit" className="btn btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
