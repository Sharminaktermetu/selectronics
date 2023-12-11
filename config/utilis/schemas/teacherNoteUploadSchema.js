const { model, Schema } = require("mongoose");

const teacherNoteUploadSchema = new Schema({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  key: {
    type: String,
  },
});

module.exports = model("TeacherNoteUpload", teacherNoteUploadSchema);
