let express = require("express");
let logger = require("morgan");
const cors = require("cors");


let app = express();
const db = require("./db");
global.__root = __dirname + "/";

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const LectureController = require("./modules/controllers/LiveLectureControllers");
const product = require("./modules/routes/product");
const signup = require("./modules/routes/User");
const category = require("./modules/routes/category") ; 
const restaurant = require("./modules/routes/restaurant");
const order = require("./modules/routes/order");
const food = require("./modules/routes/food");
const formData = require("./modules/routes/formData");
app.use("/api", LectureController);
app.use("/product" ,product ); 
app.use("/signup" ,signup );
app.use("/category" ,category );
app.use("/restaurant" ,restaurant );
app.use("/order" ,order );
app.use("/food" ,food );
app.use("/formdata" ,formData );
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })

module.exports = app;

// ip is = 192.168.1.239