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

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Sending OTP to:", email);
        // API call for sending OTP goes here
        setStep(2);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log("Verifying OTP:", otp);
        // API call for OTP verification goes here
        setStep(3);
    };

    const handlePasswordChange = (value) => {
        setNewPassword(value);
        const error = validatePassword(value);
        setPasswordError(error);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const error = validatePassword(newPassword);
        if (error) {
            setPasswordError(error);
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Password reset for:", email);
        // API call for resetting password goes here
        navigate("/login");
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
                        <button type="submit" className="btn-primary">
                            Send OTP
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
                        <button type="submit" className="btn-primary">
                            Verify OTP
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
                        <button type="submit" className="btn-primary">
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
