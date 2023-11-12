const asyncHandler = require("express-async-handler");
const quizSchema = require("../schemas/quizSchema");
const mongoose = require("mongoose");
const Quiz = new mongoose.model("Quiz", quizSchema);
/* Post */
const createQuiz = asyncHandler(async (req, res) => {
  try {
    const newQuiz = await Quiz.create({ ...req.body });
    
    res.status(200).json({
      success: true,
      message: "Quiz has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllQuiz = asyncHandler(async (req, res) => {
  try {
    const quiz = await Quiz.find({});

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

/* get single */
const getSingleQuiz = asyncHandler(async (req, res) => {
  try {
    const quiz=await Quiz.find({classRoomId: req.params.id})
    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

/* delete */
const deleteQuiz = asyncHandler(async (req, res) => {
  try {
    const data = await Quiz.deleteOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});
/* ::::::::::::::::::::::::::::::::::::::
Push quiz marks to its user
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuizAttendance = asyncHandler(async (req, res) => {
  try {
    var newAttendance = {
      attendEmail: req.body.attendEmail
    };

    const data = await Quiz.findOne({ _id: req.params.id });
    data.attendance.push(newAttendance);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

module.exports = { createQuiz, getAllQuiz, deleteQuiz,getSingleQuiz,pushQuizAttendance };