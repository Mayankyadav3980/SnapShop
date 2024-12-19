import React, { useState } from "react";
// import styles from "./SignUp.module.css";
import { handleSignUp } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../userContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpDetail, setSignUpDetail] = useState({
    email: "",
    password: "",
  });
  const {userDetails, setUserDetails} = useUserDetails();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetail((pv) => ({ ...pv, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = await handleSignUp(signUpDetail);
    setUserDetails(obj.res);
    // console.log(userDetails);
    

    if (obj.status==='success') {
      // console.log(error);
      setSignUpDetail({ email: "", password: "" });
      alert("user Created successfully");
      navigate("/signin");
    } else {
      alert("error occured user not Created");
    }
  };
  return (
    <div className="form_wrapper">
      <form className="form_container" onSubmit={handleSubmit}>
        <h2 className="heading">SignUp Form</h2>
        <input
          type="email"
          placeholder="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password(min. 6 characters req.)"
          name="password"
          id="password"
          pattern=".{6,}"
          title="Must contain at least 6 characters"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
