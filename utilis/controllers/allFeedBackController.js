const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Feedback = require("../schemas/allFeedbackSchema");
const User = require("../schemas/userSchema");

// put
const classRoomFeedbackSection = asyncHandler(async (req, res) => {
  try {
    var classRoomFeedbackData = {
      ...req?.body?.classroomFeedBack,
    };
    
    const data = await Feedback.find({});
    const updateData = {
      $set: {
        classroomFeedBack: [
          classRoomFeedbackData,
          ...data[0]?.classroomFeedBack,
        ],
      },
    };

    const result = await Feedback.updateOne(updateData);
    // 
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "Something error, can not get classRoomFeedBack data",
    });
  }
});

// student feedBack
const studentFeedBackSection = asyncHandler(async (req, res) => {
  try {
    var studentFeedBackData = { ...req?.body?.studentFeedBack };
    // 
    const studentFeedBackGetData = await Feedback.find({});

    const studentFeedBackUpdateData = {
      $set: {
        studentFeedBack: [
          studentFeedBackData,
          ...studentFeedBackGetData[0]?.studentFeedBack,
        ],
      },
    };

    const result = await Feedback.updateOne(studentFeedBackUpdateData);

    res.status(200).json({
      message: "Student feedback inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "Something error",
    });
  }
});

// user Feedback

const userFeedBackSection = asyncHandler(async (req, res) => {
  try {
    var userFeedBackData = { ...req?.body?.userFeedBack };
    const userFeedBackGetData = await Feedback.find({});
    const userFeedBackUpdateData = {
      $set: {
        userFeedBack: [
          userFeedBackData,
          ...userFeedBackGetData[0]?.userFeedBack,
        ],
      },
    };
    const result = await Feedback.updateOne(userFeedBackUpdateData);
    res.status(200).json({
      message: "user feedback inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Feedback",
    });
  }
});

// Get All Feedback

const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
    }).populate("users");
    
    const getAllFeedbackData = await Feedback.find({ user });
    res.status(200).json(getAllFeedbackData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Feedback",
    });
  }
});

module.exports = {
  classRoomFeedbackSection,
  studentFeedBackSection,
  userFeedBackSection,
  getAllFeedback,
};
