const mongoose = require("mongoose");
const studentClassRoomFeedBackSchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Please provide student name"],
    },
    studentEmail: {
      type: String,
      required: [true, "Please provide student email"],
    },
    studentClassroomFeedback: {
      type: String,
      required: [true, "Please provide student classroom feedback"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentFeedBack",
  studentClassRoomFeedBackSchema
);
