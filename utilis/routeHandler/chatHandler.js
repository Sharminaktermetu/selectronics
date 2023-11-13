const express = require("express");


const router = express.Router();
const {checkLogin,admin}=require('../middlewares/checkLogin')
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}=require('../controllers/chatController')

router.route("/").post(checkLogin, accessChat).get(checkLogin,fetchChats)
router.route("/group").post(checkLogin,createGroupChat)
router.route("/rename").put(checkLogin,renameGroup)
router.route("/add").put(checkLogin,addToGroup)
router.route("/remove").put(checkLogin,removeFromGroup)




module.exports = router;
