const mongoose = require('mongoose');
const { Schema } = mongoose;

const achievementSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  iconImg: {
    type: String,
    required: true,
  },
});

module.exports = achievementSchema;
