const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  images: [
    {
      url: {
        type: String,
        default:
          "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg" // Default image 1
      },
      caption: { type: String, default: "Hotel front view" }
    },
    {
      url: {
        type: String,
        default:
          "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg" // Default image 2
      },
      caption: { type: String, default: "Hotel room view" }
    }
  ],

  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  location: {
    city: {
      type: String,
     
    },
    state: String,
    country: {
      type: String,
     
    },
    address: {
      type: String
    },
    pincode: {
      type: Number
    }
  },
  amenities: [
    {
      type: String,
      enum: [
        "WiFi",
        "Parking",
        "Swimming Pool",
        "Restaurant",
        "Gym",
        "Spa",
        "Air Conditioning",
        "Bar",
        "Pet Friendly"
      ]
    }
  ],
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  
}, { timestamps: true });

module.exports = hotelschema;
