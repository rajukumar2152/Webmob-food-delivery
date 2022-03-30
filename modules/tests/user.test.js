const supertest = require("supertest");
const app = require("../../app");
const Product = require("./../models/Product");
const mongoose = require("mongoose");

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
   