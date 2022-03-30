const supertest = require("supertest");
const app = require("../../app");
const Food = require("./../models/Food");
const mongoose = require("mongoose");

//HAMESA YAD RAKHIO EK SATH DO DATABASE NAHI BANA SKTE HAIN
// MAIN IS FILE DB CREATE KAR RAHATHA AUY db.js wale file me bhi kar raha tha isliye ye run nahi ho raha tha

// Tested all are working correctly 

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
test("GET /food/all", async () => {
  const food_data = await Food.create({
    rating: 500,
    numReviews: 10000,

    name: "burger and and samosa ",
    category: "62133230961e1f507c64b95e",
    restaurant: "6213324bec4c0045cc02f047",
    description:
      "this is a samosa and this is very good food and you can definatly buy it",
    price: 200,
    image: "hjscdhbddjkdkjjkdcnsdjjdcjsdcnsdsdcsdjcncjcjncxkc nxkjcn",
    reviews: [
      {
        name: "ramesh",
        rating: 3,
        comment: "hello my name is ramesh and am commeting on this food",
        createdAt: "2022-02-21T11:34:45.306Z",
        updatedAt: "2022-02-21T11:34:45.306Z",
      },
    ],
    createdAt: "2022-02-21T11:34:45.307Z",
    updatedAt: "2022-02-28T10:36:53.998Z",
    // "__v": 0
  });

  await supertest(app)
    .get("/food/all")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      // console.log(response) ;
      // Check data
      expect(response.body[0]._id).toBe(food_data.id);
      expect(response.body[0].rating).toBe(food_data.rating);
      expect(response.body[0].reviews.name).toBe(food_data.reviews.name);
      // expect(response.body[0].category).toBe(food_data.category);
      // expect(response.body[0].reviews[0].comment).toBe(food_data.reviews[0].comment);
      //   expect(response.body[0].reviews[0].customer).toBe(post.reviews[0].customer);
    });
});

test("POST /food", async () => {
  const data = {
    rating: 500,
    numReviews: 10000,

    name: "burger and and samosa ",
    category: "62133230961e1f507c64b95e",
    restaurant: "6213324bec4c0045cc02f047",
    description:
      "this is a samosa and this is very good food and you can definatly buy it",
    price: 200,
    image: "hjscdhbddjkdkjjkdcnsdjjdcjsdcnsdsdcsdjcncjcjncxkc nxkjcn",
    reviews: [
      {
        name: "ramesh",
        rating: 3,
        comment: "hello my name is ramesh and am commeting on this food",
        createdAt: "2022-02-21T11:34:45.306Z",
        updatedAt: "2022-02-21T11:34:45.306Z",
      },
    ],
    createdAt: "2022-02-21T11:34:45.307Z",
    updatedAt: "2022-02-28T10:36:53.998Z",
  };

  await supertest(app)
    .post("/food")
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      // expect(response.body.reviews).toBe(data.reviews); // bahut hi barik galti thi yaha
      expect(response.body.image).toBe(data.image);
       console.log(response.body.reviews)
      // Check data in the database    wah  bhai wah check bhi  kar raha hain datbase se
      const food_item = await Food.findOne({ _id: response.body._id });
      expect(food_item._id).toBeTruthy();
      expect(food_item.name).toBe(data.name);
      expect(food_item.reviews[0].comment).toBe(data.reviews[0].comment); // its also working correctly 
      expect(food_item.price).toBe(data.price);
      expect(food_item.image).toBe(data.image);
    });
});

test("PATCH /food/update/:id", async () => {
  const food_item  = await Food.create({
    rating: 500,
    numReviews: 10000,

    name: "burger and and samosa ",
    category: "62133230961e1f507c64b95e",
    restaurant: "6213324bec4c0045cc02f047",
    description:
      "this is a samosa and this is very good food and you can definatly buy it",
    price: 200,
    image: "hjscdhbddjkdkjjkdcnsdjjdcjsdcnsdsdcsdjcncjcjncxkc nxkjcn",
    reviews: [
      {
        name: "ramesh",
        rating: 3,
        comment: "hello my name is ramesh and am commeting on this food",
        createdAt: "2022-02-21T11:34:45.306Z",
        updatedAt: "2022-02-21T11:34:45.306Z",
      },
    ],
    createdAt: "2022-02-21T11:34:45.307Z",
    updatedAt: "2022-02-28T10:36:53.998Z",
  });

  const data = {
    rating: 500,
    numReviews: 10000,

    name: "updated food burger and and samosa ",
    category: "62133230961e1f507c64b95e",
    restaurant: "6213324bec4c0045cc02f047",
    description:
      " updated descricption :-> this is a samosa and this is very good food and you can definatly buy it",
    price: 200,
    image: "hjscdhbddjkdkjjkdcnsdjjdcjsdcnsdsdcsdjcncjcjncxkc nxkjcn",
    reviews: [
      {
        name: "ramesh",
        rating: 3,
        comment: "hello my name is ramesh and am commeting on this food",
        createdAt: "2022-02-21T11:34:45.306Z",
        updatedAt: "2022-02-21T11:34:45.306Z",
      },
    ],
    createdAt: "2022-02-21T11:34:45.307Z",
    updatedAt: "2022-02-28T10:36:53.998Z",
    
  };
  await supertest(app)
    .patch("/food/update/" + food_item.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      console.log(data);
      // Check the response
      expect(response.body._id).toBe(food_item.id); // see carefully here jo response jo data wala hain aur prod ka id same hain
      expect(response.body.name).toBe(data.name);
      expect(response.body.price).toBe(data.price);
      expect(response.body.image).toBe(data.image);

      // Check the data in the database
      const newFood = await Food.findOne({ _id: response.body._id });
      //   expect(newProd).toBeTruthy();
     
      expect(newFood.name).toBe(data.name);
      expect(newFood.price).toBe(data.price);
      expect(newFood.image).toBe(data.image);
    });
});

// // Delete is also working correctly
test("DELETE /food/:id", async () => {
  const prod = await Food.create({
    rating: 500,
    numReviews: 10000,

    name: "burger and and samosa ",
    category: "62133230961e1f507c64b95e",
    restaurant: "6213324bec4c0045cc02f047",
    description:
      "this is a samosa and this is very good food and you can definatly buy it",
    price: 200,
    image: "hjscdhbddjkdkjjkdcnsdjjdcjsdcnsdsdcsdjcncjcjncxkc nxkjcn",
    reviews: [
      {
        name: "ramesh",
        rating: 3,
        comment: "hello my name is ramesh and am commeting on this food",
        createdAt: "2022-02-21T11:34:45.306Z",
        updatedAt: "2022-02-21T11:34:45.306Z",
      },
    ],
    createdAt: "2022-02-21T11:34:45.307Z",
    updatedAt: "2022-02-28T10:36:53.998Z",
  });

  await supertest(app)
    .delete("/food/" + prod.id)
    .expect(200)
    .then(async () => {
      expect(await Food.findOne({ _id: prod.id })).toBeFalsy(); // we chacked here ki sach me delete hua hain ya nahi
    });
});



