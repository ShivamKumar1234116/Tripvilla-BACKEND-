const mongoose = require('mongoose');


const restaurantschema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true

	},
	price: {
		type: Number,
		required: true
	},

	location: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String },
		country: { type: String, default: "India" },
		pincode: { type: String }
	},

	cuisine: {
		type: [String], // ["Indian", "Chinese", "Italian"]
		required: true
	},
	images: [
		{
			url: {
				type: String, 
				default: "https://static.vecteezy.com/system/resources/previews/014/947/498/large_2x/having-cozy-dinner-on-restaurant-terrace-flat-color-illustration-couples-enjoying-meals-outside-fully-editable-2d-simple-cartoon-characters-with-fancy-exterior-design-on-background-vector.jpg"
			},
			caption: { type: String }
		}
	],


	rating: {
		type: Number,
		required: true
	},
	contact: {
		phone: { type: String },
		email: { type: String }

	},
createdAtIST: {
    type: String,
    default: () =>
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  }

},
	{ timestamps: true }
)


module.exports=restaurantschema;
