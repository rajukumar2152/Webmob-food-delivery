const express = require('express');
const router = express.Router();
const Category = require("./../models/Category");


// try {
//     const category = {
//         name: "samosa is the best food ",
//     }
//     await Category.create(category);
//     // return res.json({ message: "Product  updated successfully", reward : "message fom product schema  " });
// } catch (error) {
//     console.error(req.path, error);
//     // return res
//     //     .status(500)
//     //     .json({ message: "product  update error aa raha hain kahi " });
// }



// var cat = new Category ({name:"samosa"}) ; 
// cat.save() ; 



router.post("/",async (req, res) => {
    const cat = new Category(req.body);
  
    try {
      const savedcat= await cat.save();
      res.status(200).json(savedcat);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET all Category 
//GET ALL order 
router.get("/all", async (req, res) => {
  // const query = req.query.new;
  try {
    all_cat = await Category.find() ; 
    res.status(200).json(all_cat);
    console.log(all_cat) ;
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No food with id: ${id}`);
  await Category.findByIdAndRemove(id);
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

    const result = await Category.findByIdAndUpdate(id, updates, options);
   
    res.send(result);
  } catch (error) {
    console.error(error.message);
   }
});
module.exports = router;

