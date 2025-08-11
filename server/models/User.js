import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // match your frontend rule
      // Don't add regex here — hashing happens before save
    },
    otp: { type: String }, // temporary OTP
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
