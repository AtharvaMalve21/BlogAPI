const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Connection with MongoDB`);
    })
    .catch((err) => {
      console.log("Connection failed.");
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB ;
