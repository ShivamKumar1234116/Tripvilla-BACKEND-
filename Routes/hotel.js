const express = require("express");
let hotel = require("../models/hotelmodel.js");
let Router = express.Router();




//http://localhost:8080/hotel/all/:location/:price1/price2      filter code or api
Router.get("/all/:location/:price1/:price2", async (req, res) => {
  try {
    const { location, price1, price2 } = req.params;

    const query = {
      "location.city": { $regex: location, $options: "i" },
      price: { $gte: Number(price1), $lte: Number(price2) },
    };

    const hotels = await hotel.find(query);
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







//http://localhost:8080/hotel/all

Router.get("/all", async (req, res) => {
	try {
		let alldata = await hotel.find({});
		res.json(alldata)
	}
	catch (err) {
		res.status(400).json({ message: "not Found data", error: err.message });
	}
})

//http://localhost:8080/hotel/create

Router.post("/create", async (req, res) => {
	try {
		let newhotel = new hotel(req.body);
		let savedb = await newhotel.save();
		res.status(201).json({ message: "Hotel created successfully", data: savedb })
	}
	catch (err) {
		res.status(400).json({ message: "Error creating hotel", error: err.message })
	}
})

//http://localhost:8080/hotel/:id

Router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let data = await hotel.findById(id);
		if (!data) {
			return res.status(400).json({ message: "id not found" })
		}
		res.status(200).json({ message: "data found", data: data })
	}
	catch (err) {
		res.status(400).json({ message: " data not found ", error: err.message })
	}
});

//http://localhost:8080/hotel/new/:id


Router.patch("/new/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let { description, images, price, contact } = req.body;
		let updatedata = await hotel.findByIdAndUpdate(id, { description, images, price, contact }, { new: true, runValidators: true });
		if (!updatedata) {
			return res.status(404).json({ message: "HOTEL NOT FOUND", error: err.message })
		}
		res.status(200).json({ message: "HOTEL UPDATED SUCCESSFULLY!", data: updatedata })
	} catch (err) {
		res.status(500).json({ message: "HOTEL NOT UPDATE", error: err.message })
	}
})


//http://localhost:8080/hotel/del/:id

Router.delete("/del/:id", async (req, res) => {
	try {
		id = req.params.id

		let deletedata = await hotel.findByIdAndDelete(id);
		if (!deletedata) {
			return res.status(404).json({ message: "HOTEL NOT FOUND" })
		}

		res.status(200).json({ message: "Hotel deleted successfully", data: deletedata })
	}
	catch (err) {
		res.status(500).json({ message: "HOTEL INVALID ID " })
	}
})


module.exports = Router;