const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerEngSchema = mongoose.Schema({
  subheading: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const bannerBngSchema = mongoose.Schema({
  subheading: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = { bannerEngSchema, bannerBngSchema };
