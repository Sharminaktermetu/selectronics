const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertStudentfeedBack,
} = require("../controllers/studentfeedBackController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

//  routes
router.post("/createStudentfeedBack", insertStudentfeedBack);

module.exports = router;
