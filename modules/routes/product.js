const express = require("express");
const router = express.Router();
const Product = require("./../models/Product");
const mongoose = require("mongoose") ; 
const  User = require("./../models/User");


//Method 1 for adding product
router.post("/add_product", async (req, res) => {
  try {
    const prodcut_item = {
      dish: req.body.dish,
      restaurant: req.body.restaurant,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    await Product.create(prodcut_item);
    return res.json({
      message: "Product  updated successfully",
      reward: "message fom product schema  ",
    });
  } catch (error) {
    console.error(req.path, error);
    return res
      .status(500)
      .json({ message: "product  update error aa raha hain kahi " });
  }
});

//Method 2 : addingg prduct by another method
router.post("/product2", async (req, res) => {
  const newProduct = new Product(req.body);

  
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    console.log(savedProduct);
    console.log("yaha main try kar rah hun ");


    // const user_id = User.findById(find).populate('reviews.$.customer', 'name');
    console.log(user_id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCT
router.get("/all", async (req, res) => {
  const query = req.query.new;
  try {
    const all_product = query
      ? await Product.find().sort({ _id: -1 }).limit(5)
      : await Product.find();
    res.status(200).json(all_product);
    console.log(all_product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete product
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  await Product.findByIdAndRemove(id);
  res.json({ message: "Product deleted successfully." });
});

// get product by function 
// const get_product = async()=>{
//    const result =await  Product.find() ;
//   console.log("counnting for samosha ") ;  
//     cnt_samosha = await Product.count({dish: "samosha"})
 
  //  console.log(cnt_samosha); 
  // console.log(result) ; // is command se terminal me sare product print ho jayega
  
  // get user detail by product model 
  // console.log(result[7].reviews[0].customer) ; // yaha par user ki id mil jayegi by ref 
  // const user_id=result[7].reviews[0].customer ; 
  // const user_by_product =await User.find(user_id) ; 
  // console.log("output aaja")
  // console.log(user_by_product) ; 
  // const join_res= await result.populate("result[7].reviews[0].customer.ref") ; 
  // console.log(join_res) ; 
 
// }
// get_product() ;  // here function call 

module.exports = router;

//KUCH ALG KARNE KI KOSIS KI THI PAR CAHALA NAHI

// router.post("/add_user", async (req, res) => {
//   // First Validate The Request
//   const { error } = validate(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   // Check if this user already exisits
//   let user = await User.findOne({ email: req.body.email });
//   if (user) {
//     return res.status(400).send("That user already exisits!");
//   } else {
//     // Insert the new user if they do not exist yet
//     user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     await user.save();
//     res.send(user);
//   }
// });
