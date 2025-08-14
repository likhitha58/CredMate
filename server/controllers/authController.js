import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

let otpStore = {}; // Temporary store for OTPs

// Send OTP
// Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, name, password, expires: Date.now() + 5 * 60 * 1000 };

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email HTML template
    const htmlTemplate = `
      <div style="font-family:Sansation; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          <h2 style="text-align: center; color: #4CAF50;">CredMate Verification</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for signing up! Please use the OTP below to complete your registration:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; letter-spacing: 4px; color: #333; font-weight: bold;">${otp}</span>
          </div>
          <p style="color: #555;">⚠ This OTP will expire in <strong>5 minutes</strong>.</p>
          <p>If you did not request this, please ignore this email.</p>
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
      subject: "Your CredMate OTP Code",
      html: htmlTemplate,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};


// Verify OTP and Register
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const storedData = otpStore[email];
  if (!storedData) return res.status(400).json({ message: "No OTP found for this email" });

  if (Date.now() > storedData.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    // Create new user
    const hashedPassword = await bcrypt.hash(storedData.password, 10);
    const user = new User({
      name: storedData.name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Clear OTP
    delete otpStore[email];

    res.json({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP", error: err.message });
  }
};
