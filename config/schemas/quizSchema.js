const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = mongoose.Schema({
  attendance: Array,
  quizType: String,
  classRoomId: String,
  deadline: String,
  className: String,
  quiz:[
    {
    question: String,
    choices: Array,
    answer: String,
  }
 ],

});

module.exports = quizSchema;