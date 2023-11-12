const asyncHandler = require("express-async-handler");
const assignmentSchema = require("../schemas/assignmentSchema");
const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.model("AssignmentSchema", assignmentSchema);

/* Post */
const createAssignment = asyncHandler(async (req, res) => {
  try {
    const newAssignment = await AssignmentSchema.create({ ...req.body });

    
    

    res.status(200).json({
      success: true,
      message: "Assignment has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllAssignment = asyncHandler(async (req, res) => {
  try {
    const assignment = await AssignmentSchema.find({});

    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});
/* ::::::::::::::::::::::::::::::::::::::
Get only single Assignment based on which classRoom I have accessed
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleAssignment = asyncHandler(async (req, res) => {
  try {
    const assignment = await AssignmentSchema.find({ classRoomId: req.params.classRoomId });
    if (!assignment) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});
/* ::::::::::::::::::::::::::::::::::::::
Get only single Assignment based on which classRoom I have accessed
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleAttendence = asyncHandler(async (req, res) => {
  try {
    const assignment = await AssignmentSchema.find({ classRoomId: req.params.classRoomId }).select("attendance -_id");
    if (!assignment) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});
/* delete */
const deleteAssignment = asyncHandler(async (req, res) => {
  try {
    const data = await AssignmentSchema.deleteOne({ _id: req.params.id });
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
Push question answer to that assignment
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuestionAnswers = asyncHandler(async (req, res) => {
  try {
    var questionAnswer = {
      studentEmail: req.body.studentEmail,
      studentName:req.body.studentName,
      submissionDate: req.body.submissionDate,
      answer: req.body.answer,
      file: req.body.file
    };

    const data = await AssignmentSchema.findOne({ _id: req.params.id });
    data.assignmentAnswer.push(questionAnswer);
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
/* ::::::::::::::::::::::::::::::::::::::
Push attendance to that assignment
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuestionAttendance = asyncHandler(async (req, res) => {
  try {
    questionId = req.params.questionId;
    var questionAttendance = {
      attendEmail: req.body.attendEmail
    };

    const data = await AssignmentSchema.findOne({ _id: questionId });
    data.attendance.push(questionAttendance);
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

const getManyAssingment = asyncHandler(async (req, res) => {
  try {
   
    
    const assignment = await AssignmentSchema.find({ "classRoomId": { $in: req.body.classroomId.map(id => mongoose.Types.ObjectId(id.trim())) } })
    // $in: req.body.classroomId 
   

    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    

    res.status(401).json({
      error: "Something error, can not get assignment",
    });
  }
});

module.exports = { createAssignment, getAllAssignment, deleteAssignment,getSingleAssignment, pushQuestionAnswers,pushQuestionAttendance,getManyAssingment, getSingleAttendence };
