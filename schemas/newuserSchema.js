const mongoose = require('mongoose');

const NewUserSchema =new mongoose.Schema({

    mobile: {
        type: String,
      
    },
    enteredOTP:{
        type:String,
    },
    email:{
        type:String
    },
})


const NewUserModel =new mongoose.model('newUser', NewUserSchema);

module.exports = NewUserModel;