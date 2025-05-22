const mongoose = require('mongoose');
const { Schema } = mongoose;

const comingSoonSubscribeSchema = mongoose.Schema({
  subscriber:String,
  matter:String,
  date:String
});

module.exports = comingSoonSubscribeSchema;
