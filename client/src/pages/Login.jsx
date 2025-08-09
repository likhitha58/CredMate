// Login.jsx
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4" style={{ color: "#0d6efd" }}>Login</h2>

        {/* Google Login */}
        <button
          className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
        >
          <FcGoogle size={22} /> Sign in with Google
        </button>

        <div className="text-center mb-3 text-muted">or</div>

        {/* Manual Login */}
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account? <a href="/signup">Sign Up</a>
          </small>
        </div>
      </div>
    </div>
  );
}
