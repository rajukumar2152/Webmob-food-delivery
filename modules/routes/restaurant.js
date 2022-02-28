const express = require("express");
const router = express.Router();
const Restaurant= require("./../models/Restaurant");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const newRestaurant  = new Restaurant(req.body);

  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
    console.log(savedRestaurant);
    console.log("yaha main try kar rah hun ");
    
    // const user_id = User.findById(find).populate('reviews.$.customer', 'name');
    // console.log(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all resturants detail by one request
router.get("/all", async (req, res) => {
  // const query = req.query.new;
  try {
    all_restaurant = await Restaurant.find() ; 
    res.status(200).json(all_restaurant);
    console.log(all_restaurant) ;
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Resturant 
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No food with id: ${id}`);
  await Restaurant.findByIdAndRemove(id);
  res.json({ message: "Food is  deleted successfully." });
});

// Update method   
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Food  with id: ${id}`);

    const result = await Restaurant.findByIdAndUpdate(id, updates, options);
   
    res.send(result);
  } catch (error) {
    console.error(error.message);
   }
});

module.exports = router;