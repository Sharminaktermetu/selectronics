const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  salePrice: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  interactive: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  faq: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: Array,
    required: true,
  },
  // tags: {
  //   type: Array,
  //   required: [true, 'Please provide Tag of the book'],
  // },

  author: {
    type: Array,
    required: [true, 'Please provide Tag of the book'],
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  fileLink: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
