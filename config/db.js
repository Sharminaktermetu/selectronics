const mongoose = require("mongoose");

const connectDB = async () => {
 
  // mongodb+srv://qawmiuniversity:lT3QCzGygRWuNynS@qawmiuniversity.5fbyuku.mongodb.net/?retryWrites=true&w=majority
 await mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@qawmiuniversity.5fbyuku.mongodb.net/?retryWrites=true&w=majority`,
      {
        
        useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
  socketTimeoutMS: 45000,

      }
    )
    
    .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error));
};

module.exports = connectDB;
