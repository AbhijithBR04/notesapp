import React from "react";
import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Signup = () => {
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 4 characters").max(20, "Name must be at most 20 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  const validateField = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error.message }));
    }
  };

  const validate = async () => {
    try {
      await validationSchema.validate(Inputs, { abortEarly: false });
      return true; // Validation successful
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      return false; // Validation failed
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
    validateField(name, value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const isValid = await validate();

    if (isValid) {
      
      try {
        await axios.post("http://localhost:5002/api/register", Inputs, {
          headers: {
            "Content-Type": "application/json",
          },
        });
   
        alert("Registration successful");
        history("/signin");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <input
                className={`p-2 my-3 input-signup ${errors.email ? 'is-invalid' : ''}`}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={Inputs.email}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}

              <input
                className={`p-2 my-3 input-signup ${errors.name ? 'is-invalid' : ''}`}
                type="text"
                name="name"
                placeholder="Enter Your name"
                onChange={change}
                value={Inputs.name}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}

              <input
                className={`p-2 my-3 input-signup ${errors.password ? 'is-invalid' : ''}`}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={Inputs.password}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}

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
