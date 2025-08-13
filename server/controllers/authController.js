import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Store OTPs temporarily in memory (for demo)
const otpStore = {};

export const sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory with expiry (5 mins)
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, password, name } = req.body;

    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP not sent or expired" });
    }

    const { otp: storedOtp, expiresAt } = otpStore[email];

    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Create new user in MongoDB
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Delete OTP after verification
    delete otpStore[email];

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
