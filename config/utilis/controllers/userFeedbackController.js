const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const UserfeedBack = require("../schemas/userFeedbackSchema");

// Post UserfeedBack

const insertUserfeedBack = asyncHandler(async (req, res) => {
  try {
    const newUserfeedBack = new UserfeedBack(req.body);
    const savedUserfeedBack = await newUserfeedBack.save();
    res.status(200).json(savedUserfeedBack);
  } catch (error) {
    res.status(500).json({
      message: "Failed UserfeedBack Insert",
    });
  }
});

module.exports = { insertUserfeedBack };
