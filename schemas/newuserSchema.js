const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
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
})


const NewUserModel = mongoose.model('newUser', NewUserSchema);

module.exports = NewUserModel;