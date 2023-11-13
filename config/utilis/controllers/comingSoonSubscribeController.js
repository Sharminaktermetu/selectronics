const asyncHandler = require("express-async-handler");
const comingSoonSubscribeSchema = require("../schemas/comingSoonSubscribe");
const mongoose = require("mongoose");
const ComingSoonSubscribe = new mongoose.model("ComingSoonSubscribe", comingSoonSubscribeSchema);

const createComingSoonSubscribe = asyncHandler(async (req, res) => {
  try {
    const newComingSoon = await ComingSoonSubscribe.create({ ...req.body });
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

const getAllComingSoonSubscribe = asyncHandler(async (req, res) => {
  try {
    const comingSoon = await ComingSoonSubscribe.find({});

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

module.exports = { createComingSoonSubscribe, getAllComingSoonSubscribe };