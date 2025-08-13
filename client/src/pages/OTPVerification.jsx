import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.otp) {
      setErrorMsg("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "OTP verification failed");
      } else {
        console.log("✅ OTP verified successfully:", data);
        navigate("/home"); // redirect after success
      }
    } catch (error) {
      setErrorMsg("Server error during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-verification-page">
      <h2>Verify Your Account</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          required
          maxLength={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
}
