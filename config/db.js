const mongoose = require("mongoose");

const connectDB = async () => {
 
  mongoose
    .connect(
      `mongodb+srv://sharmin:wW4XHat7Bla0Q7hK@cluster0.asjv0yk.mongodb.net/?appName=Cluster0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error,'ok'));
};

module.exports = connectDB;
