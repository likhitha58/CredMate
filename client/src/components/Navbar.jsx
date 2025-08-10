import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

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
          <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate("/")}>Logout</button>
            </div>
        </div>
      </div>
    </header>
  );
}
