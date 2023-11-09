const mongoose = require("mongoose");
const { Schema } = mongoose;

const comingSoonSchema = mongoose.Schema({
  heading: String,
  title: String,
  countDown: Number,
  image: String,

});

module.exports = comingSoonSchema;