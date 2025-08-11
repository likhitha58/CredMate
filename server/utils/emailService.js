import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password from Google
  },
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"CredMate" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP for CredMate Signup",
    text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP code is: <b>${otp}</b></p><p>This code will expire in 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    throw new Error("Could not send OTP email");
  }
};
