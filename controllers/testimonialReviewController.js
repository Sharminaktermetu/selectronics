const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Review = require('../schemas/testimonialReviewSchema');

// Post Review

const insertReview = asyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
    });
    // await newbook.save();
    ;

    res.status(200).json({
      success: true,
      message: 'Review created Successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'something wrong, cannot create Review',
    });
  }
  // try {
  //   ;
  //   const newReview = new Review(req.body);
  //   const savedReview = await newReview.save();
  //   res.status(200).json(savedReview);
  // } catch (error) {
  //   res.status(500).json({
  //     message: 'Failed Review Insert',
  //   });
  // }
});

// Get All Review

const getAllReview = asyncHandler(async (req, res) => {
  try {
    const getAllReviewData = await Review.find({});
    res.status(200).json(getAllReviewData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting All Review',
    });
  }
});

// Get Single Review

const getSingleReview = asyncHandler(async (req, res) => {
  try {
    const getSingleReviewData = await Review.findById(req.params.reviewId);
    res.status(200).json(getSingleReviewData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting Single Review',
    });
  }
});

// Delete Review
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json(deleteReview);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Deleting Review',
    });
  }
});

const ReviewUpdate = asyncHandler(async (req, res) => {
  const c_id = req.params.reviewId;

  const updatedReview = await Review.findByIdAndUpdate(
    c_id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedReview) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  res.status(200).json({
    success: true,
    data: updatedReview,
  });
});

module.exports = {
  insertReview,
  getAllReview,
  getSingleReview,
  deleteReview,
  ReviewUpdate,
};
