const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertStudentClassGuide,
  getAllStudentClassGuide,
} = require("../controllers/studentClassGuideController");

router.post("/createStuClsGuide", insertStudentClassGuide);
router.get("/stuClsGuide", getAllStudentClassGuide);

module.exports = router;
