const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = mongoose.Schema({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  lesson: {
    type: Number,
  },
  durationHr: {
    type: String,
  },
  rank: {
    type: String,
  },
  courseType: {
    type: String,
  },
  featuredVideo: {
    type: String,
  },

  certificate: {
    type: Boolean,
    default: false,
  },
  article: {
    type: Number,
  },
  medium: {
    type: String,
  },
  access: {
    type: String,
  },
  level: {
    type: String,
  },
  courseTime: {
    type: Number,
  },
  teacherInfo: Array,

  salePrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: String,
  PromoCode:String,
  PromoPercentage:Number,
  visibility:String,
  courseFuture:Object,
  curriculum: [
    {
      moduleName: String,
      lessons: [
        {
          lessonType: String,
          title: String,
          preview: Boolean,
          video: String,
          duration: Object,
          previewVideo:String,
          quizes: [
            {
              question: String,
              answer: String,
              choice: Array,
            },
          ],
          noteFile: String,
          noteText: String,
          totalMark: String,
          passMark: String,
          deadline: String,
        },
      ],
    },
  ],
  // Quiz:[
  //     {
  //         Quiz2:[{
  //             question:String,
  //              answer:String,
  //              choices:Array

  //         }],

  //     }
  // ],
  FAQ: [{ category: String, question: String, answer: String }],
  announcement: String,
  review:[{
    rate:Number,
   review:String,
    reviewer:Object

  }],
  //    teacher:{
  //     type:mongoose.Types.ObjectId,
  //     ref:'User'
  // }
  likes: Array,
});

module.exports = courseSchema;
