import React, { useState } from "react";
import { handleSignUp } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/reducers/userReducer";
import { addUserToDb } from "../../redux/reducers/userReducer";

export const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [signUpDetail, setSignUpDetail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetail((pv) => ({ ...pv, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(setUserDetails(signUpDetail));
    const obj = await handleSignUp(signUpDetail);
    // setUserDetails({uid:obj.res, uemail:signUpDetail.email});

    if (obj.status === "success") {
      dispatch(
        addUserToDb([obj.res._tokenResponse.localId, signUpDetail.email])
      );
      dispatch(
        setUserDetails({
          uId: obj.res._tokenResponse.localId,
          uEmail: signUpDetail.email,
          uPassword: signUpDetail.password,
        })
      );
      setSignUpDetail({ email: "", password: "" });
      navigate("/signin");
    }
  };
  return (
    <div className="form_wrapper">
      <form className="form_container" onSubmit={handleSubmit}>
        <h2 className="heading">Sign up Form</h2>
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
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-outline-secondary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// export default SignUp;
