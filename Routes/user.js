// ================= IMPORTS =================
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Router = express.Router();



// ================= SIGNUP =================
Router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // JWT token create
    // JWT token create (signup route)
const token = jwt.sign(
  { id: newUser._id, email: newUser.email },
  process.env.SECRET_KEY,
  { expiresIn: "7d" }
);


    res.status(201).json({
      message: "User created successfully",
      token,
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "User not created", error: err.message });
  }
});

// ================= LOGIN =================
Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Generate token
  const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.SECRET_KEY,
  { expiresIn: "7d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ================= GET ALL USERS =================
Router.get("/getall", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "Users fetched successfully", data: allUsers });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================= GET USER BY ID =================
Router.get("/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User found", data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================= UPDATE USER =================
Router.patch("/update/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================= DELETE USER =================
Router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
