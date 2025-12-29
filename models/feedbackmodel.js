const mongoose=require("mongoose");
const feedbackFormSchema=require("../schemas/feedbackschema");

const Feedbackmodel=mongoose.model("Feedbackform",feedbackFormSchema);

module.exports=Feedbackmodel;
