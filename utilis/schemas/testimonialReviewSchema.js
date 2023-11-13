const mongoose = require('mongoose');
const testimonialReviewSchema = mongoose.Schema(
  {
    personName: {
      type: String,
      required: true,
    },
    reviewPersonImg: {
      type: String,
    },

    location: {
      type: String,
      required: [true, 'Please provide location'],
    },
    review: {
      type: String,
      required: [true, 'Please provide description of the review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide a rating'],
    },

    batchName: {
      type: String,
      // enum: ['Batch', 'Private'],
    },
    showPage: {
      type: String,
      // enum: ['reviewPage', 'homePage'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', testimonialReviewSchema);
