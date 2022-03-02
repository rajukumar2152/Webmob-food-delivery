const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = require("./../models/Food");
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const multer = require("multer");

router.post("/", async (req, res) => {
  const newFood = new Food(req.body);

  try {
    const saveFood = await newFood.save();
    res.status(200).json(saveFood);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL order
router.get("/all", async (req, res) => {
  // const query = req.query.new;
  try {
    all_food = await Food.find();
    res.status(200).json(all_food);
    console.log(all_food);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete food
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No food with id: ${id}`);
  await Food.findByIdAndRemove(id);
  res.json({ message: "Food is  deleted successfully." });
});

// Update method  method in food its workin sucessfully
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

//  image upload by using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

// router.get('/',function(req,res){
//   res.sendFile(__dirname + './../server.html');

// // });
router.post("/fileupload", upload.single("image"), function (req, res, next) {
  const filename = req.file.filename;
  const detail = req.file ; 
  res.json({
    message: "Image Uploaded Successfully",
    filename: filename,
    detail:detail , 
  });
});
// test 



module.exports = router;
