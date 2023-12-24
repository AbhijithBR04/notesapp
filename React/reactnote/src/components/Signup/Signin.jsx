import React from "react";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const Signin = () => {
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const validate = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error.message }));
    }
  };

  const change = async (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    await validate(name, value);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(Inputs, { abortEarly: false });

      const resdata = await axios.post("http://localhost:5002/api/signin", Inputs);
      console.log(resdata);
      localStorage.setItem("token", resdata.data.token);
      localStorage.setItem("uuid", resdata.data.id);
      alert(resdata.data.message);
      if (resdata.data.message === "invalid credentials") {
        history("/signup");
      } else {
        history("/notenew");
      }
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
                className={`p-2 my-3 input-signup ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={Inputs.email}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}

              <input
                className={`p-2 my-3 input-signup ${errors.password ? "is-invalid" : ""}`}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={Inputs.password}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}

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
