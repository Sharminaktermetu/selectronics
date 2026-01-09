const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const currentStudentSchema = require('../schemas/currentStudentSchema');



const CurrentStudent = mongoose.models.CurrentStudent || mongoose.model('CurrentStudent', currentStudentSchema);


const createCurrentStudent = asyncHandler(async (req, res) => {
// You missed passing req.body to console.log

  await CurrentStudent.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
  });
});

// GET / - Get all students
const getAllCurrentStudent = asyncHandler(async (req, res) => {
  const students = await CurrentStudent.find({});

  res.status(200).json({
    success: true,
    data: students,
  });
});

const deleteCurrentStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedStudent = await CurrentStudent.findByIdAndDelete(id);

  if (!deletedStudent) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent,
  });
});

// update student by ID

const updateStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
// why not it take req.body to update

  const updatedStudent = await CurrentStudent.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedStudent) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: updatedStudent,
  });
});

module.exports = {
  createCurrentStudent,
  getAllCurrentStudent,
  deleteCurrentStudent,
  
  updateStudentById,
};
