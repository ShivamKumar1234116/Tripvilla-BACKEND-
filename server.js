// ================== IMPORTS ==================
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db.js");

// Routes
const hotel = require("./Routes/hotel.js");
const restaurant = require("./Routes/restaurant.js");
const user = require("./Routes/user.js");

// ================== CONFIG ==================
dotenv.config();
const app = express();

// ================== MIDDLEWARES ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://tripvilla-pq6o.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ================== ROUTES ==================
app.use("/hotel", hotel);
app.use("/restaurant", restaurant);
app.use("/user", user);

// ================== SERVER LISTEN ==================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
