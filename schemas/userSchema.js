const mongoose = require("mongoose");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  ID: String,
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },

  location: {
    type: String,
  },

  institutionName: {
    type: String,
  },

  classType: {
    type: String,
  },

  subject: {
    type: String,
  },

  guardianName: {
    type: String,
  },

  studentId: String,
  teamId: String,

  teacherId: String,
  enrolledDate: String,
  profession: String,
  avatar: String,
  school: String,
  address: String,
  fatherName: String,
  number: String,
  dob: String,
  married: String,
  teacherOfTheMonth: Boolean,
  studentOfTheMonth: Boolean,
  nationality: String,
  birthCertificate: String,
  gender: String,
  isBlock: Boolean,
  education: {
    institution: String,
    currentYear: String,
    exam: String,
    passingYear: String,
  },
  NID: String,
  passport: String,
  bio: String,
  perCountry: String,
  perDistrict: String,
  perThana: String,
  perPostCode: String,
  perAddressLine: String,

  totalStudents: {
    type: String,
  },
  experience: {
    type: String,
  },
  institution: {
    type: String,
  },
  expert: {
    type: String,
  },
  totalClasses: {
    type: String,
  },

  studiedSchool: String,
  studiedSubject: String,
  qual1: String,
  qual2: String,
  qual3: String,
  teachedInstitute: String,
  teachedSub: String,
  teachingExperience: String,
  Department: String,
  subjectList: String,
  joiningDate: String,
  mfsNumber: String,
  mfsMedium: String,
  bankName: String,
  bankAccountName: String,
  bankAccountNum: String,
  branchName: String,
  routingName: String,

  Books: [],
  bookPayment: [],
  Course: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  payment: {},
  levels: {
    level1: String,
    level2: String,
    level3: String,
    level4: String,
    level5: String,
  },

  resetPasswordExpire: Date,
  resetPasswordToken: String,
  questionMarks: [
    {
      questionMark: Number,
      totalMark: Number,
      questionSubmittedDate: String,
      questionId: String,
      classRoomId: String,
    },
  ],
  quizMarks: [
    {
      quizMark: Number,
      totalMark: Number,
      quizSubmittedDate: String,
      quizId: String,
      classRoomId: String,
    },
  ],
  teacherPayment: [
    {
      paymentForMonth: [],
      paymentDate: String,
      amountOfPayment: Number,
    },
  ],
  studentPayment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  feedback: Array,
  points: Number,
  attendance: [
    {
      classRoomId: mongoose.Schema.Types.ObjectId,
      classId: mongoose.Schema.Types.ObjectId,
      presentDate: Array,
    },
  ],
  cartDetails: {},
  verifyToken: String,
  verifyTokenExpire: Date,
});
userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      number: this.number,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};
userSchema.methods.getResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordToken = encryptedToken;

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
