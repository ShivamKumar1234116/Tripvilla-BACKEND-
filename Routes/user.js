const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
const sendOTPEmail = require("../utils/emailservice");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  
const otpgenerator = require("../utils/otpgen");
const e = require("express");
const otpStore = new Map();


//localhost:8080/api/signup
router.post("/signup", async (req, res) => {
  try {

    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // ✅ important response
    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error during signup"
    });

  }
});

//localhost:8080/api/send-otp
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;     
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    // Generate OTP
    const otp = otpgenerator();
    // Save OTP to user document (you can also set an expiration time)
     otpStore.set(email, {
    otp,
    expiry: Date.now() + 10 * 60 * 1000
  });
    await user.save();  
    // Send OTP email
    await sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Server error during OTP generation" });
  } 
});

router.post("/verify-email", async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const record = otpStore.get(email);

    console.log("OTP record from store:", record);

    if (!record || record.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    await user.save();

    otpStore.delete(email);

    res.json({ message: "Email verified successfully" });

  } catch (error) {

    console.error("Error verifying email:", error);

    res.status(500).json({
      message: "Server error during email verification"
    });

  }
});

//http://localhost:8080/api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;     
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } 
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});
module.exports = router;