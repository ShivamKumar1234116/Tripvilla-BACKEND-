
const mongoose = require("mongoose");

const hotelschema=require("../schemas/hotelschema.js")


const hotelmodel=  mongoose.model("hotel",hotelschema);


module.exports=hotelmodel;