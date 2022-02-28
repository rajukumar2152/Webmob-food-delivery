const express = require("express");
const router = express.Router();
const Order= require("./../models/Order");

const mongoose = require("mongoose") ; 

router.post("/", async (req, res) => {
  const newOrder  = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
    console.log(savedOrder);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL order 
router.get("/all", async (req, res) => {
    // const query = req.query.new;
    try {
      all_order = await Order.find() ; 
      res.status(200).json(all_order);
      console.log(all_order) ;
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Delete order
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  await Order.findByIdAndRemove(id);
  res.json({ message: "Order is  deleted successfully." });
});


// Update method   
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Food  with id: ${id}`);

    const result = await Food.findByIdAndUpdate(id, updates, options);
   
    res.send(result);
  } catch (error) {
    console.error(error.message);
   }
});



// I tried here populate function and its working sucessfully 
// const populate_fun =async()=>{
//   // const pop_ans = await Order.find() .populate("user") ; 
//   const normal = await Order.find() ; 

//   // console.log(normal[5].phoneNumber) ; 
//   // console.log(pop_ans.totalPrice); 
// }
// populate_fun() ; 
module.exports = router;