const asyncHandler = require("express-async-handler");
const leaderBoardSchema = require("../schemas/leaderBoardSchema");
const mongoose = require("mongoose");
const leaderBoard = new mongoose.model("leaderBoard", leaderBoardSchema);

/* Post */
const createLeaderBoard = asyncHandler(async (req, res) => {
  try {
    const newBoard = await leaderBoard.create({ ...req.body });
    
    res.status(200).json({
      success: true,
      message: "leader has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllLeaderBoard = asyncHandler(async (req, res) => {
  try {
    const newBoard = await leaderBoard.find({});

    res.status(201).json({
      success: true,
      data: newBoard,
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
    const data = await leaderBoard.deleteOne({ _id: req.params.id });
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

module.exports = { createLeaderBoard, getAllLeaderBoard, deleteQuiz };