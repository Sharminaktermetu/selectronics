const asyncHandler = require("express-async-handler");
const roomSchema = require("../schemas/roomSchema");
const mongoose = require("mongoose");
const Room = new mongoose.model("room", roomSchema);
/* Post */
const createRoom = asyncHandler(async (req, res) => {
  try {
    const newRoom = await Room.create({ ...req.body });
    
    res.status(200).json({
      success: true,
      message: "Room has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllRoom = asyncHandler(async (req, res) => {
  try {
    const quiz = await Room.find({});

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get room data, please contact with author",
    });
  }
});
/* ///////////////////////// */

/* get single */
const getSingleQuiz = asyncHandler(async (req, res) => {
  try {
    const quiz=await Room.find({classRoomId: req.params.id})
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
    const data = await Room.deleteOne({ _id: req.params.id });
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

    const data = await Room.findOne({ _id: req.params.id });
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

module.exports = { createRoom, getAllRoom };