// -------- Connect to db with Mongoose -------- //

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/qover", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("connected to qover db");
});
