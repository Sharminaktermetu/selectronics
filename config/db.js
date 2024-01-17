const mongoose = require("mongoose");

const connectDB = async () => {
  // mongodb+srv://new-user:dz5lEcBMj7JwHfGN@cluster0.pjt1xjf.mongodb.net/?retryWrites=true&w=majority
  // mongodb+srv://qawmiuniversity:lT3QCzGygRWuNynS@qawmiuniversity.5fbyuku.mongodb.net/?retryWrites=true&w=majority
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
