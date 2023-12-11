const asyncHandler = require('express-async-handler');
const populerSubjectsSchema = require('../schemas/populerSubjectsSchema');
const mongoose = require('mongoose');
const PopulerSubjects = new mongoose.model(
  'PopulerSubjects',
  populerSubjectsSchema
);

const createsubjects = asyncHandler(async (req, res) => {
  try {
    const newPopulerSubjects = await PopulerSubjects.create({
      ...req.body,
    });
    // await newbook.save();
    
    
    res.status(200).json({
      success: true,
      message: 'newPopulerSubjects created Successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

const getnewPopulerSubjects = asyncHandler(async (req, res) => {
  try {
    const PopulerSubjectss = await PopulerSubjects.find({});

    res.status(201).json({
      success: true,
      data: PopulerSubjectss,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = { createsubjects, getnewPopulerSubjects };
