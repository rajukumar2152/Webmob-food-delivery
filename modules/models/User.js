// const mongoose = require("mongoose");
// const User = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     // confirmpassword : {type : String , required :true } ,
// });

// mongoose.model("User", User);
// module.exports = mongoose.model("User");

// const Joi = require('joi');
// const mongoose = require('mongoose');

// const User = mongoose.model('User', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 1024
//     }
// }));

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(user, schema);
// }

// exports.User = User;
// exports.validate = validateUser;
// module.exports = mongoose.model("User");
// module.exports = mongoose.model("validate");

// var mongoose = require('mongoose');
// const User = mongoose.Schema({
//    name:{
//      type:String,
//      require:true
//    },
//    password:{
//      type:String,
//      require:true
//    }
// });
// // module.exports = User = mongoose.model('User',User);
// exports.User = User;
// module.exports = mongoose.model("User");

// const mongoose = require("mongoose");
// const User = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
  
// });
// mongoose.model("User", User);
// module.exports = mongoose.model("User");


// import mongoose from "mongoose"
const mongoose = require("mongoose");
// import bcrypt from "bcryptjs"
var bcrypt = require("bcrypt");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)




mongoose.model("User", userSchema);
module.exports = mongoose.model("User");