const asyncHandler = require('express-async-handler');
const achievementSchema = require('../schemas/achievementSchema');
const mongoose = require('mongoose');
const Achievement = new mongoose.model('Achievement', achievementSchema);
const ObjectId = require('mongodb').ObjectId;
const createAchievement = asyncHandler(async (req, res) => {
  try {
    const newAchievement = await Achievement.create({
      ...req.body,
    });
    // await newbook.save();
    ;

    res.status(200).json({
      success: true,
      message: 'Achievement created Successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'something wrong, cannot create Achievement',
    });
  }
});
const getAllAchievement = asyncHandler(async (req, res) => {
  try {
    const achievements = await Achievement.find({});

    res.status(201).json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
module.exports = { createAchievement, getAllAchievement };
