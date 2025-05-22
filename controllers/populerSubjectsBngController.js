const asyncHandler = require('express-async-handler');

const mongoose = require('mongoose');
const populerSubjectsBngSchema = require('../schemas/populerSubjectsBngSchema');
const PopulerSubjectsBng = new mongoose.model(
  'populerSubjectsBng',
  populerSubjectsBngSchema
);

const createsubjectsBng = asyncHandler(async (req, res) => {
  try {
    const newPopulerSubjectsBng = await PopulerSubjectsBng.create({
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

const getnewPopulerSubjectsBng = asyncHandler(async (req, res) => {
  try {
    const PopulerSubjectsBngs = await PopulerSubjectsBng.find({});

    res.status(201).json({
      success: true,
      data: PopulerSubjectsBngs,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = { createsubjectsBng, getnewPopulerSubjectsBng };
