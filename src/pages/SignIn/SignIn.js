import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../../auth";
// import { useUserDetails } from "../../userContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/reducers/userReducer";

const SignIn = ({ setIsUserLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDetail, setsignInDetail] = useState({
    email: "",
    password: "",
  });

  // const { setUserDetails } = useUserDetails();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = await handleSignIn(signInDetail);

    if (obj.status) {
      dispatch( setUserDetails({
        uId: obj.res,
        uEmail: signInDetail.email,
      }) )
      
      setIsUserLoggedIn(true);
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
        <h2 className="heading">Sign In Form</h2>
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
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-outline-secondary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
