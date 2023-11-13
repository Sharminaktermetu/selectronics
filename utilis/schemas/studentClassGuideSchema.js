const mongoose = require("mongoose");
const studentClassGuideSchema = mongoose.Schema({
  stuAcceptable: {
    type: String,
  },
  stuNotAcceptable: {
    type: String,
  },
  classTopics: {
    type: String,
  },
  concerningIssue: {
    type: String,
  },
});

module.exports = mongoose.model("StudentClassGuide", studentClassGuideSchema);
