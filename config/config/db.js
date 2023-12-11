const mongoose = require("mongoose");

const connectDB = async () => {
  
  mongoose
    .connect(
      `mongodb+srv://qawmiuniversity:lT3QCzGygRWuNynS@qawmiuniversity.5fbyuku.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error));
};

module.exports = connectDB;
