// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    otp: { type: String }, // store OTP temporarily
    otpExpires: { type: Date }, // expiry for OTP
    isVerified: { type: Boolean, default: false }, // track if user verified
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
