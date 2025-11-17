const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

// ✅ Connect to DB
mongoose
  .connect(URL)
  .then(() => {
	console.log("DB connected");
  })
  .catch((err) => {
	console.log(err);
  });
