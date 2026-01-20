const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
const mongoose = require("mongoose");
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema);
const bcrypt = require("bcrypt");
const generateToken = require("../utilis/generateToken");
const sendEmail = require("../utilis/sendEmail");
const crypto = require("crypto");
const ObjectId = require("mongodb").ObjectId;

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      fatherName,
      email,
      number,
      password,
      dob,
      nationality,
      married,
      gender,
      birthCertificate,
      avatar,
      NID,
      passport,
      bio,
      perCountry,
      perDistrict,
      perThana,
      perPostCode,
      perAddressLine,
      qual1,
      qual2,
      qual3,
      Department,
      joiningDate,
      mfsNumber,
      mfsMedium,
      bankName,
      bankAccountName,
      bankAccountNum,
      branchName,
      routingName,
      role,
      totalStudents,
      experience,
      institution,
      expert,
      totalClasses,
    } = req.body;

    // Basic validation
    if (!name || (!email && !number)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name and either email or number are required",
        });
    }

    // Check for existing user
    let existingUser = null;
    if (email) existingUser = await User.findOne({ email });
    if (!existingUser && number) existingUser = await User.findOne({ number });

    if (existingUser) {
      return res
        .status(409)
        .json({
          success: false,
          message: "User already exists with this email or number",
        });
    }

    // Hash password if provided
    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Generate verification token
    const verifyToken = crypto.randomBytes(20).toString("hex");
    const encryptedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    // Create user document
    const userData = {
      name,
      fatherName,
      email,
      number,
      password: hashedPassword,
      dob,
      nationality,
      married,
      gender,
      birthCertificate,
      avatar,
      NID,
      passport,
      bio,
      perCountry,
      perDistrict,
      perThana,
      perPostCode,
      perAddressLine,

      qual1,
      qual2,
      qual3,
      Department,
      joiningDate,
      totalClasses,
      mfsNumber,
      mfsMedium,
      bankName,
      bankAccountName,
      bankAccountNum,
      branchName,
      routingName,
      role,
      // just the fields i add on model
      totalStudents,
      experience,
      institution,
      expert,
      verifyToken: encryptedToken,
      verifyTokenExpire: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    const newUser = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});
const registerTeacher = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      fatherName,
      email,
      number,
      password,
      dob,
      nationality,
      married,
      gender,
      birthCertificate,
      avatar,
      NID,
      passport,
      bio,
      perCountry,
      perDistrict,
      perThana,
      perPostCode,
      perAddressLine,
      qual1,
      qual2,
      qual3,
      Department,
      joiningDate,
      mfsNumber,
      mfsMedium,
      bankName,
      bankAccountName,
      bankAccountNum,
      branchName,
      routingName,
      role, // might be overridden as teacher
      totalStudents,
      experience,
      institution,
      expert,
      totalClasses,
    } = req.body;

    // Basic validation
    if (!name || (!email && !number)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name and either email or number are required",
        });
    }

    // Check if user exists
    let existingUser = await User.findOne({
      $or: [{ email }, { number }],
    });

    // Hash password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (existingUser) {
      // ✅ If user exists → update role to teacher
      existingUser.role = "teacher";

      // optionally update other fields if needed
      existingUser.name = name || existingUser.name;
      existingUser.fatherName = fatherName || existingUser.fatherName;
      existingUser.avatar = avatar || existingUser.avatar;
      existingUser.bio = bio || existingUser.bio;

      if (hashedPassword) {
        existingUser.password = hashedPassword;
      }

      await existingUser.save();

      return res.status(200).json({
        success: true,
        message: "User already existed, updated to teacher role",
        data: existingUser,
      });
    }

    // ✅ If user does NOT exist → create new one
    const verifyToken = crypto.randomBytes(20).toString("hex");
    const encryptedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    const userData = {
      name,
      fatherName,
      email,
      number,
      password: hashedPassword,
      dob,
      nationality,
      married,
      gender,
      birthCertificate,
      avatar,
      NID,
      passport,
      bio,
      perCountry,
      perDistrict,
      perThana,
      perPostCode,
      perAddressLine,
      qual1,
      qual2,
      qual3,
      Department,
      joiningDate,
      totalClasses,
      mfsNumber,
      mfsMedium,
      bankName,
      bankAccountName,
      bankAccountNum,
      branchName,
      routingName,
      role: "teacher", // force role as teacher
      totalStudents,
      experience,
      institution,
      expert,
      verifyToken: encryptedToken,
      verifyTokenExpire: Date.now() + 60 * 60 * 1000,
    };

    const newUser = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully with teacher role",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

const persistUser = asyncHandler(async (req, res) => {
  console.log(req.user?._id);
  try {
    const user = await User.findOne({ _id: req.user?._id });

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    console.log(user);

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
      avatar: user.avatar,
      isBlock: user.isBlock,
      message: "Logged in successfully",
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Expired log-in",
    });
  }
});

/****** Login User ********/

const loginUser = asyncHandler(async (req, res) => {
  try {
    let user;

    // Check if either number or email is present in the request body
    if (req.body.number) {
      user = await User.findOne({ number: req.body.number });
    } else if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else {
      return res.status(400).json({
        success: false,
        error: "Please provide either 'number' or 'email'",
      });
    }

    if (!user) {
      return res.status(201).json({
        success: false,
        error: "User not found",
      });
    }

    const isUserValid = await bcrypt.compare(req.body.password, user.password);

    if (!isUserValid) {
      return res.status(201).json({
        success: false,
        error: "Password incorrect! Please try again.",
      });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
      _id: user._id,
      isBlock: user.isBlock,
      avatar: user.avatar,
      data: "Login successful",
      message: "Success",
      success: true,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Login failed! Check your credentials",
    });
  }
});

/****** reset Password ********/

const resetPassword = asyncHandler(async (req, res) => {
  try {
    let user;

    // Check if either email or number is present in the request body
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else if (req.body.number) {
      user = await User.findOne({ number: req.body.number });
    } else {
      return res.status(400).json({
        success: false,
        error: "Please provide either 'email' or 'number'",
      });
    }

    if (!user?.name) {
      return res.status(201).json({
        error: "Session expired, Password can not be changed",
      });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Session expired, Password can not be changed",
    });
  }
});

/****** Update user ********/

const updateUser = asyncHandler(async (req, res) => {
  try {
    console.log(req);
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    console.log(req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const users = await User.find({ role: req.body.role }).select("-password");
    const Id = users.length + 1;

    const updateBlock = {};

    // Assign teacherId or teamId if not already present
    if (req.body.role === "teacher" && !user.teacherId) {
      updateBlock.teacherId = "QUT" + Id;
    }
    if (req.body.role === "admin" && !user.teamId) {
      updateBlock.teamId = "QUTM" + Id;
    }

    // Add new course if provided
    if (req.body.courseId) {
      updateBlock.Course = [
        { courseId: req.body.courseId },
        ...(user.Course || []),
      ];
    }

    // Add quiz marks if provided
    if (req.body.quizMark != null && req.body.totalMark != null) {
      updateBlock.quizMarks = [
        {
          quizMark: req.body.quizMark,
          totalMark: req.body.totalMark,
          quizSubmittedDate: req.body.quizSubmittedDate,
          quizId: req.body.quizId,
        },
        ...(user.quizMarks || []),
      ];
    }

    // Add teacher payment if provided
    if (req.body.TPayment) {
      updateBlock.teacherPayment = [
        req.body.TPayment,
        ...(user.teacherPayment || []),
      ];
    }

    // Update all other fields safely, including booleans like isBlock
    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];
      if (value !== undefined) {
        if (
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "object" &&
            !Array.isArray(value) &&
            Object.keys(value).length > 0) ||
          typeof value === "boolean" ||
          typeof value === "number" ||
          typeof value === "string"
        ) {
          updateBlock[key] = value;
        } else {
          updateBlock[key] = user[key]; // fallback to existing value
        }
      }
    });

    const updatedInfo = { $set: updateBlock };

    const data = await User.updateMany({ email: req.body.email }, updatedInfo, {
      new: true,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong, cannot update user" });
  }
});

// update cart for purchase
const updateCart = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;

    const updatedInfo = {
      $set: {
        ...req.body,
      },
    };

    const data = await User.updateOne(
      { _id: ObjectId(id) },
      updatedInfo,

      { new: true }
    );
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not update",
    });
  }
});

// update levels
const updateLevels = asyncHandler(async (req, res) => {
  try {
    const updatedInfo = {
      $set: {
        ...req.body,
      },
    };

    const data = await User.updateMany({ email: req.body.email }, updatedInfo, {
      new: true,
    });

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not update",
    });
  }
});

/****** get user by search********/
const getUserBySearch = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .select("name email avatar")
    .find({ _id: { $ne: req.user._id } });
  res.send(users);
});

/****** get single info of user********/
const getSingleUserHome = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: ObjectId(req?.params?.id) }).select(
      "-NID -passport -perCountry -perDistrict -perThana -perPostCode -perAddressLine -currCountry -currDistrict -currThana -currPostCode -currAddressLine -mfsNumber-mfsMedium -bankName -bankAccountName -bankAccountNum -branchName -routingName -teacherPayment -studentPayment -password"
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const getSingleUserInfo = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.params?.email })
      .select("-password ")
      .populate({
        path: "studentPayment",
        populate: {
          path: "customer_order_id",
          model: "Course",
        },
      });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const getManyByFilter = asyncHandler(async (req, res) => {
  try {
    let users = await User.find({ email: { $in: req.body.emails } })
      .select(
        "name email number role attendance avatar points studiedSchool mfsNumber feedback levels studentId teacherId teamId Department joiningDate studiedSchool"
      )
      .populate("Course")
      .populate("studentPayment");

    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

// getting user by role
const getUserByRole = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit =
      req.query.limit === "all" ? 0 : parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({ role: req.params.role });

    const users = await User.find({ role: req.params.role })
      .select(
        "-password -resetPasswordToken -resetPasswordExpire -verifyToken -verifyTokenExpire"
      )
      .skip(limit === 0 ? 0 : skip)
      .limit(limit) // if limit=0 → returns all
      .sort({ _id: -1 })
      .populate("studentPayment")
      .populate("Course", "title medium");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong, cannot get user data",
    });
  }
});

/****** get all users********/

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total users for pagination
    const totalUsers = await User.countDocuments({});

    // Fetch users with pagination
    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong, cannot get user data",
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.deleteOne({ email: req.params.email });

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::
Get only assignment field
::::::::::::::::::::::::::::::::*/

const getAssignmentMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({}).select("assignmentMarks");
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's assignment field
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserAssignmentMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "assignmentMarks"
    );
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* Quiz */

/* ::::::::::::::::::::::::::::::::::::::
Push quiz marks to its user
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuizMarks = asyncHandler(async (req, res) => {
  try {
    var quiz = {
      quizMark: req.body.quizMark,
      totalMark: req.body.totalMark,
      quizSubmittedDate: req.body.quizSubmittedDate,
      quizId: req.body.quizId,
    };

    const data = await User.findOne({ email: req.params.email });
    data.quizMarks.push(quiz);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's assignment field
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserQuiz = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "quizMarks"
    );
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* Question */

/* ::::::::::::::::::::::::::::::::::::::
Push question marks to its user
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuestionMarks = asyncHandler(async (req, res) => {
  try {
    var question = {
      questionMark: req.body.questionMark,
      totalMark: req.body.totalMark,
      questionSubmittedDate: req.body.questionSubmittedDate,
      questionId: req.body.questionId,
      classRoomId: req.body.classRoomId,
    };

    const data = await User.findOne({ email: req.params.email });
    data.questionMarks.push(question);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Oppss not",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's quiz field { email: req.params.email }
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserQuestionMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "questionMarks"
    );
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});
/* ::::::::::::::::::::::::::::::::::::::
Get only single user's quiz field { email: req.params.email }
:::::::::::::::::::::::::::::::::::::::::*/
const getStudentByStudentId = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ studentId: req.params.studentId });
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* push feedback */
const pushFeedback = asyncHandler(async (req, res) => {
  try {
    const data = await User.findOne({ email: req.params.email });
    data.feedback.push({ ...req.body });
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/* inject total point ((update)) */
const updatePoint = asyncHandler(async (req, res) => {
  try {
    const data = await User.updateOne(
      { email: req.params.email },
      { $set: { points: req.body.point } }
    );
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get classRoomFeedBack data",
    });
  }
});

const updateAttendance = asyncHandler(async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.params.email });
    let updateBlock = {};
    const { presentDate, absentDay, classId } = req.body;
    let existingAttent = userData?.attendance?.find(
      (item) => item.classId == classId
    );

    // check if the class attendents exist

    if (existingAttent) {
      //  pushing the new date

      presentDate &&
        !existingAttent.presentDate.includes(presentDate) &&
        existingAttent.presentDate.push(presentDate);

      updateBlock["attendance"] = userData.attendance.map((item) => {
        if (item.classId == req.body.classId) {
          return existingAttent;
        } else {
          return item;
        }
      });
    } else {
      updateBlock["attendance"] = [
        {
          classRoomId: req.body.classRoomId,
          classId: req.body.classId,
          presentDate: [presentDate],
          absentDay: absentDay,
        },
        ...userData?.attendance,
      ];
    }

    const updatedInfo = {
      $set: {
        ...updateBlock,
      },
    };

    const options = { multi: true };

    const data = await User.updateOne(
      { email: req.params.email },
      updatedInfo,
      options
    );

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const filterByCoursePurchasing = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ Course: { $in: [req.params.id] } }).select(
      "-password"
    );

    // const filteredUser = users.filter(user => {
    //   return user.Course.find(item => item.courseId == req.params.id )

    // })

    if (!users) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get data",
    });
  }
});

/****** get single info of user********/

const getStudentByID = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req?.params?.id })
      .select("-password")
      .populate({
        path: "studentPayment",
        populate: {
          path: "customer_order_id",
          model: "Course",
        },
      });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  // forgotPassword,
  resetPassword,
  updateUser,
  getSingleUserInfo,
  deleteUser,
  getAllUser,
  getAssignmentMarks,
  getManyByFilter,
  getUserByRole,
  getSingleUserAssignmentMarks,
  pushQuizMarks,
  getSingleUserQuiz,
  pushQuestionMarks,
  getSingleUserQuestionMarks,
  pushFeedback,
  persistUser,
  updateAttendance,
  filterByCoursePurchasing,
  getUserBySearch,
  updatePoint,
  updateAttendance,
  updateLevels,
  getStudentByID,
  // verifyEmail,
  getStudentByStudentId,
  getSingleUserHome,
  updateCart,
  registerTeacher,
};
