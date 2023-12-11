const { model, Schema } = require("mongoose");

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
});

module.exports = model("Image", imageSchema);
