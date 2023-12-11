const express = require("express");
const { allMessages, sendMessage } = require("../controllers/messageController");

const {checkLogin,admin}=require('../middlewares/checkLogin')

const router = express.Router();

router.route("/:chatId").get(checkLogin, allMessages);
router.route("/").post(checkLogin, sendMessage);

module.exports = router;