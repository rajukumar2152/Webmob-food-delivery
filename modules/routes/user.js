// const express = require('express');
// const router = express.Router();
// const User = require("./../models/Signup");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// // const myPlaintextPassword = 's0/\/\P4$$w0rD';
// // const someOtherPlaintextPassword = 'not_bacon';

// router.post("", async (req, res) => {
//     try {
//         const user_reg = {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password ,
//             confirmpassword:req.body.confirmpassword,

//         }

//         if(password!=confirmpassword){
//          return res.json({ message: "Password doesnot match  "  });
//         }else{
//             bcrypt.hash(password, saltRounds, function(err, hash) {
//                 // Store hash in your password DB.
//                 if(err){
//                     return res.json({ message: "Try lattter   "  });
//                 }else{
//                     new_user= new User ({
//                     username:req.body.username,
//                     email:req.body.email,
//                     password:hash,

//                     });
//                     await new_user.save();
//                 }

//             });

//         }

//     } catch (error) {
//         console.error(req.path, error);
//         return res
//             .status(500)
//             .json({ message: "signup error aa raha hain kahi " });
//     }

// });

// module.exports = router;

// const bcrypt = require('bcrypt');
// const  User = require("./../models/Signup");
// const validate = require("./../models/Signup")
// const express = require('express');
// const router = express.Router();

// router.post("", async (req, res) => {
//     // First Validate The Request
//     const { error } = validate(req.body);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }

//     // Check if this user already exisits
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//         return res.status(400).send('That user already exisits!');
//     } else {
//         // Insert the new user if they do not exist yet
//         // const {name , email , password}=req.body
//         const user = {
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//          };
//         // const {name , email , password}=req.body ;

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//         await user.save();
//         // await User.create(user);
//         res.send(user);
//     }
// });

// module.exports = router;

// kafi galti ke bad ye jake sahi hua

const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("./../models/User");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await User.findOne({ name: newUser.name })
    .then(async (profile) => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch((err) => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("User already exists...");
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});

router.post("/login", async (req, res) => {
  var newUser = {};
  newUser.name = req.body.name;
  (newUser.password = req.body.password), (newUser.email = req.body.email);

  await User.findOne({ name: newUser.name, email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.send("User not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              res.send("User authenticated");
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch((loginErr) => {
      console.error("Error is ", loginErr.message);
    });
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No food with id: ${id}`);
  await User.findByIdAndRemove(id);
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

    const result = await Food.findByIdAndUpdate(id, updates, options);

    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

// User authentication by using JWT token

router.post("/jwt/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // const savedUser = new User({
      //   name: authData.name,
      //   email : authData.authData,
      //   password:authData.password
      // })
      // savedUser.save() ;
      // authData.save() ;
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

router.post("/jwt/login", (req, res) => {
  // Mock user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user.save();

  jwt.sign({ user }, "secretkey", { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
