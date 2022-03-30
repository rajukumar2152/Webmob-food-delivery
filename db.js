const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://raju:raju@cluster1.cpels.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        // "mongodb://localhost:27017/JestDBtestprod",
         {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
    })
    .then(() => console.log("Connection successful!"))
    .catch((e) => {
        throw new Error("Error Occurred!");
    });

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

mongoose.Promise = require("bluebird");
