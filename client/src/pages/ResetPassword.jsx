// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters.";
    if (!upperCase.test(password)) return "Password must contain at least one uppercase letter.";
    if (!lowerCase.test(password)) return "Password must contain at least one lowercase letter.";
    if (!number.test(password)) return "Password must contain at least one number.";
    if (!specialChar.test(password)) return "Password must contain at least one special character.";
    return "";
  };

  const handlePasswordChange = (value) => {
    setNewPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setErrorMsg(data.message || "Failed to send OTP.");
      }
    } catch {
      setErrorMsg("Server error. Please try again later.");
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        setErrorMsg(data.message || "Invalid OTP.");
      }
    } catch {
      setErrorMsg("Server error. Please try again later.");
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(newPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password reset successful! Please login.");
        navigate("/login");
      } else {
        setErrorMsg(data.message || "Failed to reset password.");
      }
    } catch {
      setErrorMsg("Server error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Step 3: Enter New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}

            <label>Re-enter New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
