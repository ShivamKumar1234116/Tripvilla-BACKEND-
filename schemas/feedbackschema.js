const mongoose = require("mongoose");

const feedbackFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    //   match: [
    //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //     "Please enter a valid email address"
    //   ]
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    feedback: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },

    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = feedbackFormSchema;
