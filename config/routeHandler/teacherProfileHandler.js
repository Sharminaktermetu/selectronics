const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertTeacherProfile,
  getAllTeacherProfile,
  getSingleTeacherProfile,
  deleteTeacherProfile,
} = require("../controllers/teacherProfileController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createTeacherProfile", insertTeacherProfile);
router.get("/getTeacherProfile", getAllTeacherProfile);
router.get("/getTeacherProfile/:TeacherProfileId", getSingleTeacherProfile);
router.delete("/getTeacherProfile/:TeacherProfileId", deleteTeacherProfile);

module.exports = router;
