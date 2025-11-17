const express = require("express");
const restaurant = require("../models/restaurantmodel");

let Router = express.Router();


// Router.post("/create", async (req, res) => {
//   try {
//     // req.body should be an array of objects
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({ message: "Data must be an array of restaurants" });
//     }

//     let savedData = await restaurant.insertMany(req.body);

//     res.status(200).json({
//       message: "DATA INSERTED SUCCESSFULLY",
//       data: savedData,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "DATA NOT INSERTED",
//       error: err.message,
//     });
//   }
// });

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

//http://localhost:8080/restaurant/all/:location/:price1/:price2

Router.get("/all/:location/:price1/:price2", async (req, res) => {
	try {
		const { location, price1, price2 } = req.params;
		const query = {
			"location.city": { $regex: location, $options: "i" },
			price: { $gte: Number(price1), $lte: Number(price2) },
		};
		let restaur = await restaurant.find(query);
		res.status(200).json({ "data": restaur });
	}
	catch (err) {
		console.log("error", err);
		res.status(500).json({ error: " internel server error" })
	}
})

//http://localhost:8080/restaurant/create

Router.post("/create", async (req, res) => {

	try {
		let newdata = new restaurant(req.body);
		let save = await newdata.save();
		res.status(200).json({ message: "DATA INSERT SUCCESSFULLY", data: save })
	}
	catch (err) {
		res.status(500).json({ message: "DATA NOT INSERT", error: err.message })
	}
})

//http://localhost:8080/restaurant/all
Router.get("/all", async (req, res) => {
	try {

		let alldata = await restaurant.find({});

		if (!alldata) {
			return res.status(404).json({ message: "DATA NOT FOUND" })
		}
		res.status(200).json({
			message: "DATA FOUND SUCCESSFULLY",
			data: alldata
		})
	}
	catch (err) {
		res.status(500).json({ message: "FAILED TO FETCH DATA", error: err.message })
	}
})


//http://localhost:8080/restaurant/:id

Router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let data = await restaurant.findById(id)
		if (!data) {
			return res.status(404).json({ message: "DATA NOT FOUND" })
		}
		res.status(200).json({ message: "DATA FOUND SUCCESSFULLY!", data: data })
	}
	catch (err) {
		res.status(500).json({ message: "INVALID ID", error: err.message })
	}
})

//http://localhost:8080/restaurant/new/:id


Router.patch("/new/:id", async (req, res) => {
	try {
		id = req.params.id;
		let updateddata = await restaurant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
		if (!updateddata) {
			return res.status(404).json({ message: "DATA NOT FOUND" })
		}
		res.status(200).json({ message: "DATA UPDATED SUCCESSFULLY!", data: updateddata })
	}
	catch (err) {
		res.status(500).json({ message: "INVALID ID DATA", error: err.message })
	}
});


//http://localhost:8080/restaurant/delete/:id


Router.delete("/delete/:id", async (req, res) => {
	try {
		id = req.params.id;

		let deletedata = await restaurant.findByIdAndDelete(id)

		if (!deletedata) {
			return res.status(404).json({ message: "DATA NOT FOUND" })
		}
		res.status(200).json({ message: "DATA DELETE SUCCESSFULLY!", data: updateddata })
	}
	catch (err) {
		res.status(500).json({ message: "INVALID ID DATA", error: err.message })
	}
})




module.exports = Router;