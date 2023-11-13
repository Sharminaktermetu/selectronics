const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const StudentfeedBack = require("../schemas/studentFeedBackSchema");

// Post StudentfeedBack

const insertStudentfeedBack = asyncHandler(async (req, res) => {
  try {
    const newStudentfeedBack = new StudentfeedBack(req.body);
    const savedStudentfeedBack = await newStudentfeedBack.save();
    res.status(200).json(savedStudentfeedBack);
  } catch (error) {
    res.status(500).json({
      message: "Failed StudentfeedBack Insert",
    });
  }
});

module.exports = { insertStudentfeedBack };
