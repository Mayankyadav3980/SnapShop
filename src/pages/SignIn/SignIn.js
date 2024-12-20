import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../../auth";
import { useUserDetails } from "../../userContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [signInDetail, setsignInDetail] = useState({
    email: "",
    password: "",
  });

  const { userDetails, setUserDetails } = useUserDetails();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = await handleSignIn(signInDetail);

    if (obj.status) {
      setUserDetails({
        uId: obj.res,
        uEmail: signInDetail.email,
        uPassward: signInDetail.password,
      });

      navigate("/Home");
    } else alert("Invalid Credential, Please try agian");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignInDetail((pv) => ({ ...pv, [name]: value }));
  };

  return (
    <div className="form_wrapper">
      <form className="form_container" onSubmit={handleSubmit}>
        <h2 className="heading">SignIn Form</h2>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
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

export default SignIn;
