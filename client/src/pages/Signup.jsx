// Signup.jsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "../styles/signup.css";

export default function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4" style={{ color: "#0d6efd" }}>Sign Up</h2>

        {/* Google Signup */}
        <button
          className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
        >
          <FcGoogle size={22} /> Sign up with Google
        </button>

        <div className="text-center mb-3 text-muted">or</div>

        {/* Manual Signup */}
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>

          {!otpSent && (
            <>
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${passwordError ? "is-invalid" : ""}`}
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <button
                type="button"
                className="btn btn-primary w-100 mt-2"
                onClick={handleSendOtp}
                disabled={!!passwordError || !password}
              >
                Send OTP
              </button>
            </>
          )}

          {otpSent && (
            <>
              <div className="mb-3 mt-3">
                <label className="form-label">Enter OTP</label>
                <input type="text" className="form-control" placeholder="6-digit code" required />
              </div>
              <button type="submit" className="btn btn-success w-100">Verify & Sign Up</button>
            </>
          )}
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account? <a href="/login">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
}
