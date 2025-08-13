import nodemailer from "nodemailer";

// In-memory OTP store (email -> { otp, expiresAt })
const otpStore = {};

// Send OTP
export const sendOtp = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with expiry (5 mins)
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  try {
    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"CredMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    console.log(`📧 OTP sent to ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const stored = otpStore[email];

  if (!stored) {
    return res.status(400).json({ message: "No OTP sent for this email" });
  }

  if (Date.now() > stored.expiresAt) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP verified — remove from store
  delete otpStore[email];

  res.json({ message: "OTP verified successfully" });
};
