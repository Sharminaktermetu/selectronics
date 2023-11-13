const mongoose = require("mongoose");
const studentFeedBackSchema = mongoose.Schema(
  {
    studentFeedBackCategory: {
      type: String,
    },
    studentFeedback: {
      type: String,
      required: [true, "Please provide student feedback"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentFeedBack", studentFeedBackSchema);
