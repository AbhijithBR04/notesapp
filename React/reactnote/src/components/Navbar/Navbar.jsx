import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container">
          <Link class="navbar-brand" to="">
            Notes
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active  btn-nav p-2" aria-current="page" to="/note">
                  Notes
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active btn-nav p-2" aria-current="page" to="/signup">
                  Sign up
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active  btn-nav p-2" aria-current="page" to="/signin">
                  Sign in
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active  btn-nav p-2" aria-current="page" to="">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
