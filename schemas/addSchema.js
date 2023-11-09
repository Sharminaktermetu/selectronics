const mongoose = require('mongoose');
const { Schema } = mongoose;

const addSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

module.exports = addSchema;
