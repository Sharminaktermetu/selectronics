const asyncHandler = require('express-async-handler');
const addSchema = require('../schemas/addSchema');
const mongoose = require('mongoose');
const Add = new mongoose.model('Add', addSchema);
const ObjectId = require('mongodb').ObjectId;

const createadd = asyncHandler(async (req, res) => {
  try {
    const newadd = await Add.create({
      ...req.body,
    });
    // await newbook.save();
    console.log(newadd);

    res.status(200).json({
      success: true,
      message: 'newadd created Successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

const getAlladd = asyncHandler(async (req, res) => {
  try {
    const adds = await Add.find({});

    res.status(201).json({
      success: true,
      data: adds,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = {
  createadd,
  getAlladd,
};
