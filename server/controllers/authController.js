import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Temporary stores for OTPs
let signupOtpStore = {};
let resetOtpStore = {};

// Common mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =======================
// SIGNUP - Send OTP
// =======================
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    signupOtpStore[email] = { otp, name, password, expires: Date.now() + 5 * 60 * 1000 };

    const htmlTemplate = `
      <div style="font-family:Sansation; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          <h2 style="text-align: center; color: #4CAF50;">CredMate Verification</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Please use the OTP below to complete your registration:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; letter-spacing: 4px; font-weight: bold;">${otp}</span>
          </div>
          <p>⚠ OTP will expire in <strong>5 minutes</strong>.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"CredMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CredMate OTP Code",
      html: htmlTemplate,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};

// =======================
// SIGNUP - Verify OTP & Register
// =======================
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const storedData = signupOtpStore[email];

  if (!storedData) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > storedData.expires) {
    delete signupOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (storedData.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  try {
    const hashedPassword = await bcrypt.hash(storedData.password, 10);
    const user = new User({
      name: storedData.name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete signupOtpStore[email];
    res.json({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP", error: err.message });
  }
};

// =======================
// LOGIN
// =======================
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =======================
// GOOGLE LOGIN
// =======================
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        password: null,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: jwtToken });
  } catch (err) {
    res.status(401).json({ message: "Google login failed", error: err.message });
  }
};

// =======================
// PASSWORD RESET - Send OTP
// =======================
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    resetOtpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Sending reset OTP from:", process.env.EMAIL_USER);

    // HTML email template
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          <h2 style="text-align: center; color: #4CAF50;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset your password. Use the OTP below to proceed:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; letter-spacing: 4px; color: #333; font-weight: bold;">${otp}</span>
          </div>
          <p style="color: #555;">⚠ This OTP will expire in <strong>5 minutes</strong>.</p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 12px; text-align: center; color: #999;">
            &copy; ${new Date().getFullYear()} CredMate. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"CredMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CredMate Password Reset OTP",
      html: htmlTemplate,
    });

    res.json({ message: "Reset OTP sent successfully" });
  } catch (err) {
    console.error("❌ Error sending reset OTP:", err);
    res.status(500).json({ message: "Error sending reset OTP", error: err.message });
  }
};

// =======================
// PASSWORD RESET - Verify OTP
// =======================
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  const storedData = resetOtpStore[email];

  if (!storedData) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > storedData.expires) {
    delete resetOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (storedData.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  res.json({ message: "OTP verified" });
};

// =======================
// PASSWORD RESET - Update Password
// =======================
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const storedData = resetOtpStore[email];

  if (!storedData) return res.status(400).json({ message: "No OTP found" });
  if (storedData.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (Date.now() > storedData.expires) {
    delete resetOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    delete resetOtpStore[email];
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
};
