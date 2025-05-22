const mongoose = require('mongoose');
const { Schema } = mongoose;

const classRoomSchema = mongoose.Schema({
  department: String,

  slogan: String,

  subject: String,

  assignedTeacher: Array,

  roomNo: String,

  accessedStudent: Array,

  image: String,
 
  classes: [
    {
      className: String,
      hour: String,
      image: String,
      minute: String,
      selectedDays: Array,
      studentGuide: {
        acceptable: String,
        notAcceptable: String,
      },
      teacherGuide: {
        classTopic: String,
        concerningIssue: String,
      },
      advise : String,
      teacherEmail: String,
      timeSlot: String,
      zoomLink: String,
      startingDate: String,
      rating: Number,
      total: Number,
    },
  ],

  //   teacherGuide:{
  //     classTopic:String,
  //     concerningIssue:String
  //   },
  //   teacherEmail:String,
  //   timeSlot:String,
  //   zoomLink:String,
  //   startingDate:String,

  // }],

  video: [
    {
      videoTitle: String,
      email: String,
      name: String,
      videoId: String,
      uploadDate: String,
      duration: String,
      classType: String,
    },
  ],
  classNote: [
    {
      title: String,
      note: String,
      date: String,
      className: String,
    },
  ],
  // video: {
  //   type: Array,
  //   required: [true, 'Please provide Tag of the book'],
  // },
});

module.exports = classRoomSchema;
