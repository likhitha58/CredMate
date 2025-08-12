// src/middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  console.log("🛡 Auth middleware triggered");

  try {
    const authHeader = req.headers.authorization;
    console.log("🔍 Authorization header:", authHeader);

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("⚠ Authorization header missing or malformed");
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔑 Extracted token:", token ? "[Present]" : "[Missing]");

    if (!token) {
      console.warn("⚠ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified. Decoded payload:", decoded);

    // Attach user payload to request
    req.user = decoded; // { id, email, iat, exp }

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
