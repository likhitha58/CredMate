import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom"; // For redirecting after success

export default function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    setErrorMsg("");
    if (passwordError || !formData.password) return;

    if (!formData.name || !formData.email) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Signup failed");
      } else {
        setOtpSent(true);
      }
    } catch (error) {
      setErrorMsg("Server error. Try again later.");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "OTP verification failed");
      } else {
        // OTP verified successfully - redirect to login or home page
        alert("Signup successful! You can now login.");
        navigate("/login");
      }
    } catch (error) {
      setErrorMsg("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-logo-wrapper">
        <img src={logo} alt="Logo" className="signup-logo-small" />
      </div>

      <div className="signup-container single-column">
        <div className="signup-card">
          <h2>Sign Up</h2>
          <p className="signup-subtitle">Create a new account</p>

          <button className="btn-google">
            <FcGoogle size={22} /> Sign up with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <form onSubmit={otpSent ? handleVerifyOtp : (e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={otpSent}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={otpSent}
            />

            {!otpSent && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={passwordError ? "input-error" : ""}
                />
                {passwordError && (
                  <p className="error-text">{passwordError}</p>
                )}

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSendOtp}
                  disabled={!!passwordError || !formData.password || loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Sign Up"}
                </button>
              </>
            )}
          </form>

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <p className="text-center">© 2025 CredMate</p>
      </footer>
    </div>
  );
}
