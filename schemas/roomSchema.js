const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = mongoose.Schema({
  roomId: String,
  roomName: String,
  roomAvatar: String,
  roomMembers:Array,
  roomChats: Array,
});

module.exports = roomSchema;