// test("returns undefined by default", () => {
//     const mock = jest.fn();
  
//     let result = mock("foo");
  
//     expect(result).toBeUndefined();
//     expect(mock).toHaveBeenCalled();
//     expect(mock).toHaveBeenCalledTimes(1);
//     expect(mock).toHaveBeenCalledWith("foo");
//   });
// const app = require("./../server");
const app = require("./../../app");

// const Post = require("./../models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");

// beforeEach((done) => {
//   mongoose.connect("mongodb://localhost:27017/JestDBtest",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => done());
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done()) 
//   });
// });


// test("GET /api/posts", async () => {
//   const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

//   await supertest(app).get("/api/posts")
//     .expect(200)
//     .then((response) => {
//       // Check type and length
//       expect(Array.isArray(response.body)).toBeTruthy();
//       expect(response.body.length).toEqual(1);

//       // Check data
//       expect(response.body[0]._id).toBe(post.id);
//       expect(response.body[0].title).toBe(post.title);
//       expect(response.body[0].content).toBe(post.content);
//     });
// });

test("POST /product/add_product", async () => {
  const data = { dish: "hello am tetsting the api here " , image: "the testing tools used are jest and superset"   };

  await supertest(app).post("/product/add_product")
    
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response 
      console.log(response.body) ; 
    //   expect(response.body._id).toBeTruthy();
      expect(response.body.dish).toBe(data.dish);
      expect(response.body.image).toBe(data.image);
      // expect(response.body.author).toBe(data.author);

      // Check data in the database    wah  bhai wah check bhi  kar raha hain datbase se 
    //   const post = await Post.findOne({ _id: response.body._id });
    //   expect(post).toBeTruthy();
    //   expect(post.title).toBe(data.title);
    //   expect(post.content).toBe(data.content);
      // expect(post.author).toBe(data.author);
    });
});

// test("GET /product/all", async () => {
//   const post = await Post.create({ titttle: "Post 1 by raju kumar ", contettnt: "yaha main test kar raha hun " });

//   await supertest(app).get("/product/all" )
//     .expect(200)
//     .then((response) => {
//       // expect(response.body._id).toBe(post.id);
//       post.title= "raju kumarc" ; 
//       expect(response.body.title).toBe(post.title);
//       expect(response.body.content).toBe(post.content);
//       console.log(post) ; 
//     });
// });

// test("PATCH /api/posts/:id", async () => {
//   const post = await Post.create({ titlgge: "Post 1", conhhtent: "Lorem ipsum" });

//   const data = { title: "New title", content: "dolor sit amet" };

//   await supertest(app).patch("/api/posts/" + post.id)
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       console.log(data); 
//       // Check the response
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.title).toBe(data.title);
//       expect(response.body.content).toBe(data.content);

//       // Check the data in the database
//       const newPost = await Post.findOne({ _id: response.body._id });
//       expect(newPost).toBeTruthy();
//       expect(newPost.title).toBe(data.title);
//       expect(newPost.content).toBe(data.content);
//     });
// });

// test("DELETE /api/posts/:id", async () => {
//   const post = await Post.create({
//     title: "Post 1",
//     content: "Lorem ipsum",
//   });

//   await supertest(app)
//     .delete("/api/posts/" + post.id)
//     .expect(204)
//     .then(async () => {
//       expect(await Post.findOne({ _id: post.id })).toBeFalsy();
//     }); 
// });



