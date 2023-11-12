const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaderBoardSchema = mongoose.Schema({
  name: String,
  points: Number,
  attend : Number,
  email: String,
  avatar: String,
});

module.exports = leaderBoardSchema;