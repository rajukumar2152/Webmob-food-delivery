const supertest = require("supertest");
const app = require("../../app");
// const Food = require("./../models/Order");
const mongoose = require("mongoose");
const Order = require("./../models/Order");

//HAMESA YAD RAKHIO EK SATH DO DATABASE NAHI BANA SKTE HAIN
// MAIN IS FILE DB CREATE KAR RAHATHA AUY db.js wale file me bhi kar raha tha isliye ye run nahi ho raha tha

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/JestDBDummy",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      poolSize: 10,
    },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// get is working properly it is  ok
test("GET /order/all", async () => {
  const order_data = await Order.create({
    shippingAddress: {
      address: "# 2152 sector 52 chandigarh ",
      city: "chandigarh ",
    },
    shippingPrice: 50,
    totalPrice: 100,
    isDelivered: true,
    _id: "6214800d9df1b23c44f1fcc5",
    user: "620a4f96886fc83e509bf9f0",
    orderItems: [
      {
        _id: "6214800d9df1b23c44f1fcc6",
        name: "gulab jamun",
        qty: 1,
        image: "mkdsjkgjdfgjkjgbfhjlk",
        price: 100,
        food: "621378951193cd4cac2fb7fd",
      },
    ],
    phoneNumber: "566545456585",
    createdAt: "2022-02-21T10:08:07.760Z",
    updatedAt: "2022-02-21T10:08:07.760Z",
    __v: 0,
  });

  await supertest(app)
    .get("/order/all")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      // console.log(response) ;
      // Check data
      expect(response.body[0]._id).toBe(order_data.id);
      expect(response.body[0].shippingPrice).toBe(order_data.shippingPrice);
        expect(response.body[0].shippingAddress.address).toBe(order_data.shippingAddress.address);
    //   expect(response.body[0].category).toBe(order_data.category);
      // expect(response.body[0].reviews[0].comment).toBe(food_data.reviews[0].comment);
      //   expect(response.body[0].reviews[0].customer).toBe(post.reviews[0].customer);
    });
});

test("POST /order", async () => {
  const data = {
    shippingAddress: {
        address: "# 2152 sector 52 chandigarh ",
        city: "chandigarh ",
      },
      shippingPrice: 50,
      totalPrice: 100,
      isDelivered: true,
    //   _id: "6214800d9df1b23c44f1fcc5",
      user: "620a4f96886fc83e509bf9f0",
      orderItems: [
        {
        //   _id: "6214800d9df1b23c44f1fcc6",
          name: "gulab jamun",
          qty: 1,
          image: "mkdsjkgjdfgjkjgbfhjlk",
          price: 100,
          food: "621378951193cd4cac2fb7fd",
        },
      ],
      phoneNumber: "566545456585",
      createdAt: "2022-02-21T10:08:07.760Z",
      updatedAt: "2022-02-21T10:08:07.760Z",
      __v: 0,
  };

  await supertest(app)
    .post("/order")
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body._id).toBeTruthy();
      expect(response.body.shippingPrice).toBe(data.shippingPrice);
      // expect(response.body.reviews).toBe(data.reviews); // bahut hi barik galti thi yaha
      expect(response.body.totalPrice).toBe(data.totalPrice);
    //    console.log(response.body.reviews)
      // Check data in the database    wah  bhai wah check bhi  kar raha hain datbase se
      const order_item = await Order.findOne({ _id: response.body._id });
      expect(order_item._id).toBeTruthy();
      expect(order_item.shippingPrice).toBe(data.shippingPrice);
    });
});

// yaha thora sa update me dikkat aa raha hain bad me dekhta hun 
test("PATCH /order/update/:id", async () => {
  const order_item  = await Order.create({
    shippingAddress: {
        address: "# 2152 sector 52 chandigarh ",
        city: "chandigarh ",
      },
      shippingPrice: 50,
      totalPrice: 100,
      isDelivered: true,
      user: "620a4f96886fc83e509bf9f0",
      orderItems: [
        {
          name: "gulab jamun",
          qty: 1,
          image: "mkdsjkgjdfgjkjgbfhjlk",
          price: 100,
          food: "621378951193cd4cac2fb7fd",
        },
      ],
      phoneNumber: "566545456585",
      createdAt: "2022-02-21T10:08:07.760Z",
      updatedAt: "2022-02-21T10:08:07.760Z",
      __v: 0,
  });

  const data = {
    shippingAddress: {
        address: "updated adress # 2152 sector 52 chandigarh ",
        city: "chandigarh ",
      },
      shippingPrice: 50,
      totalPrice: 100,
      isDelivered: true,
    
      user: "620a4f96886fc83e509bf9f0",
      orderItems: [
        {
          
          name: " updated gulab jamun",
          qty: 1,
          image: "mkdsjkgjdfgjkjgbfhjlk",
          price: 100,
          food: "621378951193cd4cac2fb7fd",
        },
      ],
      phoneNumber: "566545456585",
      createdAt: "2022-02-21T10:08:07.760Z",
      updatedAt: "2022-02-21T10:08:07.760Z",
      __v: 0,
  };
  await supertest(app)
    .patch("/order/update/" + order_item.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      console.log(data);
      // Check the response
    //   expect(response.body._id).toBe(order_item.id); // see carefully here jo response jo data wala hain aur prod ka id same hain
      expect(response.body.shippingPrice).toBe(data.shippingPrice);
    //   expect(response.body.price).toBe(data.price);
    //   expect(response.body.image).toBe(data.image);

      // Check the data in the database
      const newOrder = await Order.findOne({ _id: response.body._id });
      //   expect(newProd).toBeTruthy();

      expect(newOrder.shippingPrice).toBe(data.shippingPrice);
      expect(newOrder.totalPrice).toBe(data.totalPrice);
    //   expect(newOrder.user).toBe(data.user);
    });
});

// // Delete is also working correctly
test("DELETE /food/:id", async () => {
  const prod = await Order.create({
    shippingAddress: {
        address: "# 2152 sector 52 chandigarh ",
        city: "chandigarh ",
      },
      shippingPrice: 50,
      totalPrice: 100,
      isDelivered: true,
  
      user: "620a4f96886fc83e509bf9f0",
      orderItems: [
        {
          name: "gulab jamun",
          qty: 1,
          image: "mkdsjkgjdfgjkjgbfhjlk",
          price: 100,
          food: "621378951193cd4cac2fb7fd",
        },
      ],
      phoneNumber: "566545456585",
      createdAt: "2022-02-21T10:08:07.760Z",
      updatedAt: "2022-02-21T10:08:07.760Z",
      __v: 0,
  });

  await supertest(app)
    .delete("/order/" + prod.id)
    .expect(200)
    .then(async () => {
      expect(await Order.findOne({ _id: prod.id })).toBeFalsy(); // we chacked here ki sach me delete hua hain ya nahi
    });
});
