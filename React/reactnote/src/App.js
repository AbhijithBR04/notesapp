import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signup/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./components/Note/Note";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/note" element={<Note />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
