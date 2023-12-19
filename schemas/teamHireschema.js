const mongoose = require('mongoose');

const TeamHireModel = mongoose.Schema(
  {
    user: { name: String, email: String },
    address: { type: String },
    age: { type: String },

    studentName: { type: String },
    attDays: { type: String },
    attTime: { type: String },
    interestedSubject: [],
    subject: { type: String },
    description: { type: String },
    parentName: { type: String },
    phoneNumber: { type: String },
    regType: { type: String },
    teacherInfo: {},

   
  },

  { timestamps: true }
);

const TeamHire = mongoose.model('teamHire', TeamHireModel);

module.exports = TeamHire;
