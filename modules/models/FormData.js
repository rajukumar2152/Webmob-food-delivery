const mongoose = require("mongoose");

const form_data = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
   
    last_name: {
      type: String,
      required: true,
    }
   
})


mongoose.model("FormData", form_data);
module.exports = mongoose.model("FormData");


    