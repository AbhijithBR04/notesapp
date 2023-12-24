import React from "react";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Signin = () => {
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault()
    try {
      const resdata = await axios.post("http://localhost:5002/api/signin", Inputs);
      console.log(resdata);
      localStorage.setItem("token", resdata.data.token);
      localStorage.setItem("uuid", resdata.data.id);
      alert(resdata.data.message)
      history('/note')
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
  

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
                onChange={change}
                value={Inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={Inputs.password}
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
