const supertest = require("supertest");
const app = require("../../app");
const Product = require("./../models/Product");
const mongoose = require("mongoose");

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
test("GET /product/all", async () => {
  const post = await Product.create({
    averageRating: 2,
    dish: "jalebi",
    image: "bndfbhdhbfvhjfdjh",
    restaurant: "punabi dhaba ",
    description:
      "this is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
    price: 100,
    category: "non veg",
    reviews: [
      {
        customer: "620a48ba3f098c491c85529d",
        comment: "they have good service according to me ",
        stars: 5,
      },
    ],
  });

  await supertest(app)
    .get("/product/all")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      // expect(response.body.length).toEqual(1);
      console.log(response.body) ;
      // Check data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].dish).toBe(post.dish);
      expect(response.body[0].restaurant).toBe(post.restaurant);
      expect(response.body[0].category).toBe(post.category);
      expect(response.body[0].reviews[0].comment).toBe(post.reviews[0].comment);
      //   expect(response.body[0].reviews[0].customer).toBe(post.reviews[0].customer);
    });
});

test("POST /product/product2", async () => {
  const data = {
    averageRating: 2,
    dish: "jalebi",
    image: "bndfbhdhbfvhjfdjh",
    restaurant: "punabi dhaba ",
    description:
      "this is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
    price: 100,
    category: "non veg",
    reviews: [
      {
        customer: "620a48ba3f098c491c85529d",
        comment: "they have good service according to me ",
        stars: 5,
      },
    ],
  };

  await supertest(app)
    .post("/product/product2")
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body._id).toBeTruthy();
      expect(response.body.dish).toBe(data.dish);
      expect(response.body.restaurant).toBe(data.restaurant); // bahut hi barik galti thi yaha
      expect(response.body.image).toBe(data.image);

      // Check data in the database    wah  bhai wah check bhi  kar raha hain datbase se
      const prod = await Product.findOne({ _id: response.body._id });
      expect(prod).toBeTruthy();
      expect(prod.dish).toBe(data.dish);
      expect(prod.restaurant).toBe(data.restaurant);
      expect(prod.image).toBe(data.image);
    });
});

// test("GET /product/all", async () => {
//   const prod = await Product.create({
//     averageRating: 2,
//     dish: "jalebi",
//     image: "bndfbhdhbfvhjfdjh",
//     restaurant: "punabi dhaba ",
//     description:
//       "this is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
//     price: 100,
//     category: "non veg",
//     reviews: [
//       {
//         customer: "620a48ba3f098c491c85529d",
//         comment: "they have good service according to me ",
//         stars: 5,
//       },
//     ],
//   });

//   await supertest(app)
//     .get("/product/all")
//     .expect(200)
//     .then((response) => {
//       expect(response.body[0]._id).toBe(prod.id);

//       expect(response.body[0].dish).toBe(prod.dish);
//       expect(response.body[0].restaurant).toBe(prod.restaurant);
//       expect(response.body[0].image).toBe(prod.image);
//         // console.log(response.body[0]) ;
//     });
// });

test("PATCH /product/update/:id", async () => {
  const prod = await Product.create({
    averageRating: 2,
    dish: "jalebi",
    image: "bndfbhdhbfvhjfdjh",
    restaurant: "punabi dhaba ",
    description:
      "this is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
    price: 100,
    category: "non veg",
    reviews: [
      {
        customer: "620a48ba3f098c491c85529d",
        comment: "they have good service according to me ",
        stars: 5,
      },
    ],
  });

  const data = {
    averageRating: 2,
    dish: "updated jalebi",
    image: "updated image ",
    restaurant: "updated  punabi dhaba ",
    description:
      "updated dhaba this  is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
    price: 100,
    category: "non veg",
    reviews: [
      {
        customer: "620a48ba3f098c491c85529d",
        comment: " updated  they have good service according to me ",
        stars: 5,
      },
    ],
  };

  await supertest(app)
    .patch("/product/update/" + prod.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      console.log(data);
      // Check the response
      expect(response.body._id).toBe(prod.id); // see carefully here jo response jo data wala hain aur prod ka id same hain
      expect(response.body.dish).toBe(data.dish);
      expect(response.body.restaurant).toBe(data.restaurant);
      expect(response.body.image).toBe(data.image);

      // Check the data in the database
      const newProd = await Product.findOne({ _id: response.body._id });
      //   expect(newProd).toBeTruthy();
      console.log(newProd);
      expect(newProd.dish).toBe(data.dish);
      expect(newProd.restaurant).toBe(data.restaurant);
      expect(newProd.image).toBe(data.image);
    });
});

// Delete is also working correctly
test("DELETE /product/:id", async () => {
  const prod = await Product.create({
    averageRating: 2,
    dish: "jalebi",
    image: "bndfbhdhbfvhjfdjh",
    restaurant: "punabi dhaba ",
    description:
      "this is punjabi dhaba this is the very good dhaba ek bar aa ke to dekho ",
    price: 100,
    category: "non veg",
    reviews: [
      {
        customer: "620a48ba3f098c491c85529d",
        comment: "they have good service according to me ",
        stars: 5,
      },
    ],
  });

  await supertest(app)
    .delete("/product/" + prod.id)
    .expect(200)
    .then(async () => {
      expect(await Product.findOne({ _id: prod.id })).toBeFalsy(); // we chacked here ki sach me delete hua hain ya nahi
    });
});
