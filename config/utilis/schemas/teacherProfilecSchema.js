const mongoose = require("mongoose");
const teacherProfilecSchema = mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: [true, "Please provide teacher name"],
    },
    teacherProfileImg: {
      type: String,
      required: [true, "Please provide teacher profile img"],
    },

    teacherDesignation: {
      type: String,
      required: [true, "Please provide teacher designation"],
    },
    teacherBioDescription: {
      type: String,
      required: [true, "Please provide teacher bio description"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("teacherProfile", teacherProfilecSchema);
