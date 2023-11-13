const mongoose = require("mongoose");
const { Schema } = mongoose;

const faqSchema = mongoose.Schema({
  question: String,
  answer: String,
  category: String
});

module.exports = faqSchema;