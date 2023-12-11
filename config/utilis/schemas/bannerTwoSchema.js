const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerTwoEngSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  list1: {
    type: String,
    required: true,
  },
  list2: {
    type: String,
    required: true,
  },
  list3: {
    type: String,
    required: true,
  },

  subheading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const bannerTwoBngSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  list1: {
    type: String,
    required: true,
  },
  list2: {
    type: String,
    required: true,
  },
  list3: {
    type: String,
    required: true,
  },

  subheading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = { bannerTwoEngSchema, bannerTwoBngSchema };
