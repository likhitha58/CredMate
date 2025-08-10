import React from "react";
import { FcGoogle } from "react-icons/fc";
import "../styles/login.css";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="login-page">
      {/* Logo */}
      <div className="login-logo-wrapper">
        <img src={logo} alt="Logo" className="login-logo-small" />
      </div>

      {/* Form Section */}
      <div className="login-container single-column">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>
          <p className="login-subtitle">Please login to continue</p>

          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="btn-primary">Login</button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Google Button */}
          <button className="btn-google">
            <FcGoogle className="google-icon" /> Continue with Google
          </button>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <p className="text-center">© 2025 CredMate</p>
      </footer>
    </div>
  );
};

export default Login;
