// Signup.jsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import "../styles/signup.css";

export default function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must have 1 uppercase letter, 1 special character, 1 number, and be 8-20 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSendOtp = () => {
    if (!passwordError && password) {
      setOtpSent(true);
    }
  };

  return (
    <div className="signup-page">
      {/* Optional Logo */}
      <div className="signup-logo-wrapper">
        <img
          src={logo}
          alt="Logo"
          className="signup-logo-small"
        />
      </div>

      <div className="signup-container single-column">
        <div className="signup-card">
          <h2>Sign Up</h2>
          <p className="signup-subtitle">Create a new account</p>

          {/* Google Signup */}
          <button className="btn-google">
            <FcGoogle size={22} /> Sign up with Google
          </button>

          {/* Divider */}
          <div className="divider"><span>OR</span></div>

          {/* Signup Form */}
          <form>
            <input
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              required
            />

            {!otpSent && (
              <>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={passwordError ? "input-error" : ""}
                />
                {passwordError && <p className="error-text">{passwordError}</p>}

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSendOtp}
                  disabled={!!passwordError || !password}
                >
                  Send OTP
                </button>
              </>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                />
                <button type="submit" className="btn-primary">
                  Verify & Sign Up
                </button>
              </>
            )}
          </form>

          {/* Login link */}
          <div className="login-link">
            Forgot Password? <a href="/resetpassword">Reset</a>         
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <p className="text-center">© 2025 CredMate</p>
      </footer>
    </div>
  );
}
