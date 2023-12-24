import React from "react";
import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5002/api/register", Inputs,{
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.message === "user already exists") {
            alert(res.data.message);
          } else {
            alert(res.data.message);

            history("/signin");
          }
        });
    } catch (error) {
      console.log(error);
    }

    console.log(Inputs);
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
                type="name"
                name="name"
                placeholder="Enter Your name"
                onChange={change}
                value={Inputs.name}
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
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
