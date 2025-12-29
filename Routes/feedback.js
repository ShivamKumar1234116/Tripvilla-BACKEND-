const express = require("express");
const Feedback = require("../models/feedbackmodel");

const router = express.Router();
//http://localhost:8080/feedback
router.post("/", async (req, res) => {
	try {
		const { name, email, rating, feedback } = req.body;

		// Validation
		if (!name || !email || !rating || !feedback) {
			return res.status(400).json({
				success: false,
				message: "All fields are required"
			});
		}
		// Create feedback
		const newFeedback = new Feedback({
			name,
			email,
			rating,
			feedback
		});

		// Save to DB
		await newFeedback.save();

		// Response
		return res.status(201).json({
			success: true,
			message: "Feedback saved successfully",
			data: newFeedback
		});

	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: err.message
		});
	}
});


//http://localhost:8080/feedback/getall

router.get("/getall", async (req, res) => {
	try {
		const feedbacks = await Feedback.find();

		if (!feedbacks.length) {
			return res.status(404).json({
				success: false,
				message: "No feedback found",
				data: []
			});
		}

		return res.status(200).json({
			success: true,
			message: "Feedback retrieved successfully",
			data: feedbacks
		});

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message
		});
	}
});

//http://localhost:8080/feedback/getby/:id


router.get("/getby/:id", async (req, res) => {

	try {
		let { id } = req.params
		const SingleFeedback = await Feedback.findById(id);
		if (!SingleFeedback) {
			res.status(404).json({
				message: "Feedback not found",
				success: false,
			})

		}


		res.status(200).json({
			message: "Feedback retrieved successfully",
			success: true,
			data: SingleFeedback
		})


	}

	catch (error) {
		res.status(500).json({
			message: "Server error",
			success: false,
			error: error.message
		})

	}



})

//http://localhost:8080/feedback/delete/:id

router.delete("/delete/:id", async (req, res) => {

	try {

		let { id } = req.params;
		const deleteFeedback = await Feedback.findByIdAndDelete(id);


		if (!deleteFeedback) {
			res.status(404).json({
				message: "Feedback not found",
				success: false,
			})
		}

		res.status(200).json({
			message: "Feedback deleted successfully",
			success: true,
			data: deleteFeedback
		})

	}
	catch (error) {
		res.status(500).json({
			message: "Server error",
			success: false,
			error: error.message
		})

	}
})



module.exports = router;
