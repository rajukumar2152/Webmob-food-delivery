const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FormData = require("./../models/FormData");
const bodyParser = require('body-parser')


router.post("/", async (req, res) => {
    const data = new FormData(req.body);
  
    try {
      const Savedata = await data.save();
      res.status(200).json(Savedata);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/all", async (req, res) => {
    // const query = req.query.new;
    try {
      all_data = await FormData.find();
      res.status(200).json(all_data);
      console.log(all_data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;


//   router.post('/', (req, res, next) => {
//     const new_data = new FormData({
//         // _id: new mongoose.Types.ObjectId(),
//         name: req.body.first_name,
//         price: req.body.last_name 
//     });
//     FormData.save().then(result => {
//         console.log(result);
//         res.status(201).json({
//             message: 'Created product successfully',
//             createdForm: {
//                 name: result.name,
//                 price: result.price,
//                 // _id: result._id,
//                 // request: {
//                 //     type: 'GET',
//                 //     url: `http://localhost:3000/products/${result._id}`
//                 // }
//             }
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// });


  