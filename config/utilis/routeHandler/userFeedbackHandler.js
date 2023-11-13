const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { insertUserfeedBack } = require("../controllers/userFeedbackController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createUserFeedBack", insertUserfeedBack);

module.exports = router;
