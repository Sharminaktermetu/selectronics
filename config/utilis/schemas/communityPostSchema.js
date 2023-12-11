const mongoose = require("mongoose");
const { Schema } = mongoose;

const communityPostSchema = mongoose.Schema({
  heading: String,
  image: String,
  describe: String,
  owner: Object,
  date: String,
  comments: Array,
  likes: Array,
});

module.exports = communityPostSchema;
