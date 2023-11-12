const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const TeacherProfile = require("../schemas/teacherProfilecSchema");

// Post TeacherProfile

const insertTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const newTeacherProfile = new TeacherProfile(req.body);
    const savedTeacherProfile = await newTeacherProfile.save();
    res.status(200).json(savedTeacherProfile);
  } catch (error) {
    res.status(500).json({
      message: "Failed TeacherProfile Insert",
    });
  }
});

// Get All TeacherProfile

const getAllTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const getAllTeacherProfileData = await TeacherProfile.find({});
    res.status(200).json(getAllTeacherProfileData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All TeacherProfile",
    });
  }
});

// Get Single TeacherProfile

const getSingleTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const getSingleTeacherProfileData = await TeacherProfile.findById(
      req.params.TeacherProfileId
    );
    res.status(200).json(getSingleTeacherProfileData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single TeacherProfile",
    });
  }
});

// Delete TeacherProfile
const deleteTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const deleteTeacherProfile = await TeacherProfile.findByIdAndDelete(
      req.params.TeacherProfileId
    );
    res.status(200).json(deleteTeacherProfile);
  } catch (error) {
    res.status(500).json({
      message: "Failed Deleting TeacherProfile",
    });
  }
});

module.exports = {
  insertTeacherProfile,
  getAllTeacherProfile,
  getSingleTeacherProfile,
  deleteTeacherProfile,
};
