const mongoose = require('mongoose');
const { Schema } = mongoose;

const populerSubjectsBngSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  SubTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = populerSubjectsBngSchema;
