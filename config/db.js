const mongoose = require("mongoose");

const connectDB = async () => {

  mongoose
    .connect(`mongodb+srv://qawmi:gUweWqnFYVX4BX1P@qawmi-university.ude8vl9.mongodb.net/?retryWrites=true&w=majority`,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      //  bufferTimeoutMS: 30000,
      // socketTimeoutMS: 1000 // 30 seconds
      // bufferCommands: false, // Disables buffering
    // bufferMaxEntries: 0 // Sets bufferMaxEntries to 0
      }
    )
    
    .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error));
};

module.exports = connectDB;
