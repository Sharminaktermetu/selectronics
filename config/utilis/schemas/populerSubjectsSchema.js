const mongoose = require('mongoose');
const { Schema } = mongoose;

const populerSubjectsSchema = mongoose.Schema({
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

module.exports = populerSubjectsSchema;
