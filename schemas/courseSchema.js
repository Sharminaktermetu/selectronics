const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = mongoose.Schema({
  title: {
    type: String,
  },
  engTitle: {
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
  courseTime: {
    type: String,
  },
  courseSeat: {
    type: String,
  },
  courseDay: {
    type: String,
  },
  singleHighlighter: {
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
  teacherInfo: Array,

  salePrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  banSalePrice: {
    type: String,
  },
  banPrice: {
    type: String,
  },
  description: String,
  PromoCode: String,
  PromoPercentage: Number,
  visibility: String,
  courseFuture: Object,
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
          previewVideo: String,
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
  pay: [{ category: String, question: String, answer: String }],
  whatLearn: [

    {
      title: String,
      uploadUrl: String,
    },
  ],
  whatYouGet: [

    {
      uploadUrl: String,
      title: String,
      subtitle: String,
    },
  ],
 courseWhy: [
  {
    uploadUrl: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    layout: { type: String, default: "" },
  },
],
courseWhyTitle: {  primaryTopTitle: { type: String, default: "" },   // primary top title
  secondaryTopTitle: { type: String, default: "" },},

  courseForWhom: [{ title: String }],
  announcement: String,
  review: [
    {
      rate: Number,
      review: String,
      reviewer: Object,
    },
  ],
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },


  // home page display data
  totalEnroll: {
    type: Number,
    default: 0,
  },

  classNote: {
    type: String,
  },

  lectures: {
    type: String,
  },
  courseDuration: {
    type: String,
  },
  // course detail page  data
//   মোট লাইভ ক্লাস --------ইনপুট 
// ক্লাস ভিডিও-নোট ---ইনপুট 
// লেভেল --------ইনপুট 
// কোর্স ফি--------ইনপুট 
// সার্টিফিকেট --------ইনপুট 
// কোর্সের বিবরণ --------ইনপুট 
// কোর্সটি করছেন --------ইনপুট
// make it dynamic
coursedetails :{
  totalLiveClass : String,
  classVideoNote : String,
  level : String,
  courseFee : String,
  courseDescription : String,
  courseEnrolled : String,
},



  likes: Array,

  //
});

module.exports = courseSchema;
