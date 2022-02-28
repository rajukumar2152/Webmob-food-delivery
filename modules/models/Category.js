// import mongoose from "mongoose";
const mongoose = require("mongoose")

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const Category = mongoose.model("Category", categorySchema);
                                   // ye karne se erroe aa raha hain dhyan ralhio aage se 
// export default Category;
    

mongoose.model("Category", categorySchema);
module.exports = mongoose.model("Category");