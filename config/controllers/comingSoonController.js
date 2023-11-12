const asyncHandler = require("express-async-handler");
const comingSoonSchema = require("../schemas/comingSoonSchema");
const mongoose = require("mongoose");
const ComingSoon = new mongoose.model("ComingSoon", comingSoonSchema);

const createComingSoon = asyncHandler(async (req, res) => {
  try {
    const newComingSoon = await ComingSoon.create({ ...req.body });

    
    

    res.status(200).json({
      success: true,
      message: "ClassRoom has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});

const getAllComingSoon = asyncHandler(async (req, res) => {
  try {
    const comingSoon = await ComingSoon.find({});

    res.status(201).json({
      success: true,
      data: comingSoon,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

module.exports = { createComingSoon, getAllComingSoon };