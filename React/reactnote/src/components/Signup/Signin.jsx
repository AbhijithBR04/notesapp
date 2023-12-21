import React from "react";
import "./signup.css";

const Signin = () => {
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <input
                className="p-2  my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                // onChange={change}
                // value={Inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                // onChange={change}
                // value={Inputs.password}
              />

              <button className="btn-signup p-2">Sign In</button>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Signin;
