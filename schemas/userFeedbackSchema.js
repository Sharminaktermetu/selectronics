const mongoose = require("mongoose");
const userFeedBackSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: [true, "Please provide user email"],
    },
    userFeedback: {
      type: String,
      required: [true, "Please provide user feedback"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserFeedBack", userFeedBackSchema);
