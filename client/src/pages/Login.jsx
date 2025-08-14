import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.password) {
      setErrorMsg("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-logo-wrapper">
        <img src={logo} alt="Logo" className="login-logo-small" />
      </div>

      <div className="login-container single-column">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>
          <p className="login-subtitle">Please login to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <p className="signup-link">
            Forgot Password? <a href="/resetpassword">Reset</a>
          </p>
        </div>
      </div>

      <footer className="login-footer">
        <p className="text-center">© 2025 CredMate</p>
      </footer>
    </div>
  );
};

export default Login;
