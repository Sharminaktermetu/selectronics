const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { insertNote } = require("../controllers/teacherNoteUploadController");

router.post("/noteUpload", insertNote);

module.exports = router;
