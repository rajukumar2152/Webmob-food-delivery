const mongoose = require("mongoose");
const Notification = new mongoose.Schema({
    link: { type: String, required: true },
    classname: { type: String, required: true },
    subjectname: { type: String, required: true },
    live: { type: Boolean, default: true } ,
    author : {type : String , required :true } , 
});

mongoose.model("Notification", Notification);
module.exports = mongoose.model("Notification");