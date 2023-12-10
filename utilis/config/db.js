const mongoose = require("mongoose");

const connectDB = async () => {
  
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.h3eis.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected successfully here"))
  .catch((error) => console.log(error));
};

module.exports = connectDB;
