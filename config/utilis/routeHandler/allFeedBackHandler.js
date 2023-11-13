const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  classRoomFeedbackSection,
  studentFeedBackSection,
  userFeedBackSection,
  getAllFeedback,
} = require("../controllers/allFeedBackController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.get("/", getAllFeedback);
router.put("/updateFeedback", classRoomFeedbackSection);
router.put("/studentUpdateFeedBack", studentFeedBackSection);
router.put("/userUpdateFeedBack", userFeedBackSection);

module.exports = router;
