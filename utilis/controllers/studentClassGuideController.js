const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const StudentClassGuide = require("../schemas/studentClassGuideSchema");

// Post StudentClassGuide

const insertStudentClassGuide = asyncHandler(async (req, res) => {
  try {
    const newStudentClassGuide = new StudentClassGuide(req.body);
    const savedStudentClassGuide = await newStudentClassGuide.save();
    res.status(200).json(savedStudentClassGuide);
  } catch (error) {
    res.status(500).json({
      message: "Failed StudentClassGuide Insert",
    });
  }
});

// Get All StudentClassGuide

const getAllStudentClassGuide = asyncHandler(async (req, res) => {
  try {
    const getAllStudentClassGuideData = await StudentClassGuide.find({});
    res.status(200).json(getAllStudentClassGuideData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All StudentClassGuide",
    });
  }
});

module.exports = { insertStudentClassGuide, getAllStudentClassGuide };
