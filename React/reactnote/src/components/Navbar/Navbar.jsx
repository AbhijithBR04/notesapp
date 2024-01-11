import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState();
  const history = useNavigate();

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [localStorage.getItem("token")]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setToken("");
    history("/");
  };
const handleBack=(e)=>{
  e.preventDefault();
  history('/notenew')
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            NoteXpress
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {!token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to="/signin"
                    >
                      Sign in
                    </Link>
                  </li>
                </>
              ) : (
                <div className="d-flex">
                  <li className="nav-item">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to=""
                      onClick={handleBack}
                    >
                      Notes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to=""
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
