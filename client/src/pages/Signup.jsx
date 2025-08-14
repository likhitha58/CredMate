import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../styles/signup.css";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must have at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") validatePassword(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg("Please fill all fields.");
      return;
    }
    if (passwordError) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setErrorMsg("");
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg("Error sending OTP");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if (!formData.otp) {
    setErrorMsg("Please enter OTP");
    return;
  }
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      // Save token and name to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: formData.name, email: formData.email })
      );
      navigate("/home");
    } else {
      setErrorMsg(data.message);
    }
  } catch (err) {
    setErrorMsg("Error verifying OTP");
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

          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
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
                  type="submit"
                  className="btn-primary"
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
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
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
