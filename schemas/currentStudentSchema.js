
const mongoose = require('mongoose');

const currentStudentSchema = mongoose.Schema({

  name: {
    type: String,
    
  },
  date: {
    type: String,
    
  },
  location: {
    type: String,
    
  },
  subject:

  {
    type: String,
    
  },
  time:
  {
    type: String,
    
  },
  label:{
      type: String,
  }

});

module.exports = currentStudentSchema;
