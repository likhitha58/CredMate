import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // ensures env is loaded if imported early

console.log("📧 Email service initializing...");

// Verify env variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in environment variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password from Google
  },
});

// Optional: verify transporter connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer transporter verification failed:", error.message);
  } else {
    console.log("✅ Nodemailer transporter is ready to send emails");
  }
});

export const sendOtpEmail = async (to, otp) => {
  console.log(`📨 Preparing OTP email to: ${to}, OTP: ${otp}`);

  const mailOptions = {
    from: `"CredMate" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP for CredMate Signup",
    text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP code is: <b>${otp}</b></p><p>This code will expire in 10 minutes.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${to}, Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new Error("Could not send OTP email");
  }
};
