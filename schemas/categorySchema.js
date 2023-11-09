const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = mongoose.Schema({
  course: [
    {
      category: String,
    },
  ],
  batch: [
    {
      category: String,
    },
  ],
  library: [
    {
      category: String,
    },
  ],
  blog: [
    {
      category: String,
    },
  ],
  FAQ: [
    {
      category: String,
    },
  ],
});

module.exports = categorySchema;
