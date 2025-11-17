const mongoose = require('mongoose');
const restaurantschema=require("../schemas/restaurantschema");
const restaurant=mongoose.model("restaurant",restaurantschema);
module.exports=restaurant;



