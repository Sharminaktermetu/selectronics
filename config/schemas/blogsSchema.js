const mongoose = require('mongoose');
const blogsSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogImg: {
      type: String,
      required: true,
    },
    blogAuthorName: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
    blogTag: {
      type: Array,
      required: true,
    },

    blogCategory: {
      type: Array,
      required: true,
    },
    publishDate: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = blogsSchema;
