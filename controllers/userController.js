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




/****** Register user ********/

const registerUser = asyncHandler(async (req, res) => {
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
        error: "Please provide either 'number' or 'email' in the request body",
      });
    }

    const verifyToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    const encryptedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    if (user) {
      return res.status(201).json({
        success: false,
        error: "User already registered",
      });
    } else {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: hashedPass,
        role: req?.body?.role,
        // verifyToken: encryptedToken,
        // verifyTokenExpire: Date.now() + 60 * (60 * 1000)
      });

      console.log(newUser);

      return res.status(200).send({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Registration failed",
    });
  }
});





// persistance user
const persistUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id });

     console.log(user)


    
    res.status(200).json({
      name: user[0].name,
     
      role: user[0].role,
      _id: user[0]._id,
      avatar: user[0].avatar,
      isBlock:user[0].isBlock,
      message: "logged in successfully",
      token: generateToken(user[0]._id),
    });
  } catch (err) {
     console.log(err)
    res.status(401).json({
      error: "expired log-in",
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
        error: "Please provide either 'number' or 'email' in the request body",
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
      role: user.role,
      _id: user._id,
      isBlock: user.isBlock,
      avatar: user.avatar,
      data: "Logged in successfully",
      message: 'Success',
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




/****** Forgot password initialization ********/

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "-password -Course",

    );


    


    if (user.length <= 0) {
      return res.status(401).json({
        error: "Your email could not be found",
      });
    } else {

      // reset token gen and add to the database


      const resetToken = crypto.randomBytes(20).toString("hex");

      // Hash token (private key) and save to database
      const encryptedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");






      const edited = await User.updateOne(
        { email: req.body.email },
        {
          $set: {
            resetPasswordToken: encryptedToken,
            resetPasswordExpire: Date.now() + 10 * (60 * 1000)
          }
        },

      );
      

      // create reset url
      const resetUrl = `https://qawmiuniversity.com/user/passwordreset/${resetToken}`;
      // HTML Message
      const message = `
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <a href="https://qawmiuniversity.com" title="logo" target="_blank">
                              <img width="100" src="https://i.ibb.co/R6sJJ5R/lg.png" title="logo" alt="logo">
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                              requested to reset your password</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              We cannot simply send you your old password. A unique link to reset your
                                              password has been generated for you.This link will expired after 10 minutes. To reset your password, click the
                                              following link and follow the instructions.
                                          </p>
                                          <a href=${resetUrl}
                                              style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                              Password</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.qawmiuniversity.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
    
   `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });

        res.status(200).json({ success: true, data: "Check Inbox ! Email Sent." });
      } catch (err) {


        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(401).json({
          error: "Email could not be sent",
        });
      }
    }




  } catch (err) {
    
    console.log(err)
    res.status(401).json({
      error: "something wrong,try again",
    });
  }
});




/****** reset Password ********/

const resetPassword = asyncHandler(async (req, res) => {
  // compare token with crypto

  //Hash URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select(
      "-password -Course",

    );

    
    if (!user?.name) {
      res.status(201).json({
        error: "Session expired,Password can not be changed",
      });
      return;
    }


    const hashedPass = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (err) {
    
    res.status(201).json({
      error: "Session expired,Password can not be changed",
    });
  }
});




/****** Update user ********/

const updateUser = asyncHandler(async (req, res) => {
  try {
    
    const user = await User.find({ email: req.body.email }).select("-password");
    const users = await User.find({ role: req.body.role }).select("-password")

    let Id =  users.length + 1


    
   
    const updateBlock = {};

    
    if (req.body.role === "teacher" && !user[0]?.teacherId?.length) {
      updateBlock["teacherId"] = "QUT" + Id
    }

    if (req.body.role === "admin" && !user[0]?.teamId?.length) {
      updateBlock["teamId"] = "QUTM" + Id
    }

    if (req.body.courseId) {
      updateBlock["Course"] = [
        { courseId: req.body.courseId },
        ...user[0]?.Course,
      ];
    }

    if (req.body.quizMark && req.body.totalMark) {
      updateBlock["quizMarks"] = [
        {
          quizMark: req.body.quizMark,
          totalMark: req.body.totalMark,
          quizSubmittedDate: req.body.quizSubmittedDate,
          quizId: req.body.quizId,
        },
        ...user[0]?.quizMarks,
      ];
    }
   
  

    if (req.body.TPayment) {

      updateBlock["teacherPayment"] = [req.body.TPayment, ...user[0]?.teacherPayment]
    }

    const allObjectKey = Object.keys(req.body)

    allObjectKey.forEach(item => {
      updateBlock[item] = req.body[item].length > 0 || req.body[item] === true || req.body[item] === false ||Object.keys( req.body[item]).length !== 0 ? req.body[item] : user[0][item]
    })


  

    const updatedInfo = {
      $set: {
        ...updateBlock,

      },
    };

console.log(req.body.email)


    const data = await User.updateMany({ email: req.body.email }, updatedInfo, { new: true });


    console.log(data)
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {

    console.log(error)
    res.status(401).json({
      error: "Something error, can not update",
    });
  }
});

// update cart for purchase
const updateCart = asyncHandler(async (req, res) => {
  try {
  
    const id=req.user._id

    const updatedInfo = {
      $set: {
        ...req.body,

      },
    };

    const data = await User.updateOne(
      { _id: ObjectId(id) },
       updatedInfo, 

      { new: true })
      ;

    

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




    const data = await User.updateMany({ email: req.body.email }, updatedInfo, { new: true });

    

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

  const users = await User.find(keyword).select("name email avatar").find({ _id: { $ne: req.user._id } });
  res.send(users);
});


/****** get single info of user********/
const getSingleUserHome=asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: ObjectId(req?.params?.id) }).select(
      "-NID -passport -perCountry -perDistrict -perThana -perPostCode -perAddressLine -currCountry -currDistrict -currThana -currPostCode -currAddressLine -mfsNumber-mfsMedium -bankName -bankAccountName -bankAccountNum -branchName -routingName -teacherPayment -studentPayment -password"
    )
    

     
    res.status(200).json({
      success: true,
      data: user,
    });




  } catch (error) {

    console.log(error)
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const getSingleUserInfo = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.params?.email }).select(
      "-password "
    )
      .populate({
        path: 'studentPayment',
        populate: {
          path: 'customer_order_id',
          model: 'Course'
        }
      })

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
    
    let users = await User.find({ email: { $in: req.body.emails} }).select("name email number role attendance avatar points studiedSchool mfsNumber feedback levels studentId teacherId teamId Department joiningDate studiedSchool"
    ).populate("Course").populate("studentPayment")


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

    const user = await User.find({ role: req.params.role }).select("-password").populate("studentPayment").populate("Course", "title medium")

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

/****** get all users********/

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({}).select("-password");

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
      { $set: { points: req.body.point } },

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
    const userData = await User.findOne({ "email": req.params.email });
    let updateBlock = {}
    const { presentDate, absentDay, classId } = req.body
    let existingAttent = userData?.attendance?.find(item => item.classId == classId)

    // check if the class attendents exist

    if (existingAttent) {


      //  pushing the new date

      presentDate && !existingAttent.presentDate.includes(presentDate) && existingAttent.presentDate.push(presentDate)




      updateBlock["attendance"] = userData.attendance.map(item => {
        if (item.classId == req.body.classId) {

          return existingAttent
        } else {
          return item
        }
      })


    } else {
      updateBlock["attendance"] = [{
        classRoomId: req.body.classRoomId,
        classId: req.body.classId,
        presentDate: [presentDate],
        absentDay: absentDay

      }, ...userData?.attendance]
    }



    const updatedInfo = {
      $set: {
        ...updateBlock
      },
    };


    const options = { "multi": true };



    const data = await User.updateOne({ email: req.params.email }, updatedInfo, options);

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

    
    const users = await User.find({ Course: { $in: [req.params.id] } }).select("-password");

    
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
    const user = await User.findOne({ _id: req?.params?.id }).select(
      "-password"
    )
      .populate({
        path: 'studentPayment',
        populate: {
          path: 'customer_order_id',
          model: 'Course'
        }
      })
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
  forgotPassword,
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
  updateCart

};
