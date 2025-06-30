const mongoose = require("mongoose");

const connectDB = async () => {
 
  mongoose
    .connect(
      `mongodb+srv://MSBackend:So12uDY3G6KHD3hT@msbackend.dha4rdk.mongodb.net/?retryWrites=true&w=majority&appName=MSBackend`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error,'ok'));
};

module.exports = connectDB;
// Tv0eC7zRpehIa9uJ