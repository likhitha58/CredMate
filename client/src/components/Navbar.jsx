import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).name || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if stored
    navigate("/"); // redirect to login or home page
  };

  return (
    <header className="p-3">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

          {/* Brand Logo */}
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img src={logo} alt="CredMate Logo" className="nav-logo me-2" />
          </a>

          {/* Navigation Links */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 align-items-center ms-4">
            <li>
              <button className="nav-link px-2 text-secondary btn btn-link" onClick={() => navigate("/home")}>
                Home
              </button>
            </li>
            <li>
              <button className="nav-link px-2 text-white btn btn-link" onClick={() => navigate("/#hero")}>
                Loan Analyser
              </button>
            </li>
            <li>
              <button className="nav-link px-2 text-white btn btn-link" onClick={() => navigate("/#features")}>
                Negotiate AI
              </button>
            </li>
            <li>
              <button className="nav-link px-2 text-white btn btn-link" onClick={() => navigate("/#features")}>
                Dashboard
              </button>
            </li>
            <li>
              <button className="nav-link px-2 text-white btn btn-link" onClick={() => navigate("/#features")}>
                Account
              </button>
            </li>
          </ul>

          {/* User Dropdown */}
          <div className="text-end dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userName || "User"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}
