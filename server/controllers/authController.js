import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// Log environment variables for debugging
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// Temporary OTP stores
let signupOtpStore = {};
let resetOtpStore = {};

// Nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((err, success) => {
  if (err) console.error("❌ Email transporter verification failed:", err.message);
  else console.log("✅ Email transporter is ready");
});

// SIGNUP - Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    signupOtpStore[email] = { otp, name, password, expires: Date.now() + 5 * 60 * 1000 };

    await transporter.sendMail({
      from: `"CredMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CredMate OTP Code",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// SIGNUP - Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const stored = signupOtpStore[email];

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > stored.expires) {
    delete signupOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (stored.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  try {
    const hashedPassword = await bcrypt.hash(stored.password, 10);
    const user = new User({ name: stored.name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    delete signupOtpStore[email];
    res.json({ message: "Signup successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      message: "Login successful",
      token,
      name: user.name // <-- send the name here
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PASSWORD RESET - Send OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    resetOtpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    await transporter.sendMail({
      from: `"CredMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "CredMate Password Reset OTP",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    res.json({ message: "Reset OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reset OTP" });
  }
};

// PASSWORD RESET - Verify OTP
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  const stored = resetOtpStore[email];

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > stored.expires) {
    delete resetOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (stored.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  res.json({ message: "OTP verified" });
};

// PASSWORD RESET - Update
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const stored = resetOtpStore[email];

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (stored.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (Date.now() > stored.expires) {
    delete resetOtpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    delete resetOtpStore[email];
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};