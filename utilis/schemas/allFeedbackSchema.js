const mongoose = require("mongoose");
const allFeedBackSchema = mongoose.Schema({
  userFeedBack: Array,
  studentFeedBack: Array,
  classroomFeedBack: Array,
});

module.exports = mongoose.model("AllFeedback", allFeedBackSchema);
