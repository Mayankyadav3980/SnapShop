import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../../auth";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";

const SignIn = ({ setIsUserLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDetail, setsignInDetail] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = await handleSignIn(signInDetail);

    if (obj.status) {
      dispatch(
        setUserDetails({
          uId: obj.res,
          uEmail: signInDetail.email,
        })
      );

      setIsUserLoggedIn(true);
      toast.success("Sign In success");
      navigate("/Home");
    } else toast.error("Invalid Credential, Please try agian");
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
          value={signInDetail.email}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={signInDetail.password}
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
