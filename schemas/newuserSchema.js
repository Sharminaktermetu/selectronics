const mongoose = require('mongoose');

const NewUserSchema = new mongoose.Schema({

    mobile: {
        type: String,
      
    },
    enteredOTP:{
        type:String,
    },
    email:{
        type:String
    },
}, {
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
  })


const NewUserModel = mongoose.model('newUser', NewUserSchema);

module.exports = NewUserModel;