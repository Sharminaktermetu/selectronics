const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = mongoose.Schema({

  courseId: String,

  classRoomId: String,

  assignmentType: String,

  questionPaper: String,

  totalMark: Number,

  passMark: Number,

  deadline: String,
  
  file: String,

  assignmentAnswer: [
    { 
      studentEmail: String,
      studentName:String,
      submissionDate: String,
      answer: String,
      file: String
    }
  ],

  attendance: Array

});

module.exports = assignmentSchema;