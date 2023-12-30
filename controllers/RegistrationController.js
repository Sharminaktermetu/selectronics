const asyncHandler = require('express-async-handler');
const User = require('../schemas/userSchema');
const Registration = require('../schemas//registrationSchema');
const ObjectId = require('mongodb').ObjectId;
const createRegistration = asyncHandler(async (req, res) => {
  try {
    
    const newRegistration = await Registration.create({
      ...req.body,
    });

    res.status(200).json(newRegistration);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const RegistrationUpdate = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const data = req.body;

    const updatedInfo = {
      $set: {
        ...data,
      },
    };

    const UpdateReg = await Registration.updateOne(
      { 'user.email': email },
      updatedInfo
    );

    res.status(200).json(UpdateReg);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const RegistrationUpdateById = asyncHandler(async (req, res) => {
  
  try {
    const id = req.params.id;    
    const data = req.body;
      console.log(id)
    const updatedInfo = {
      $set: {
        ...data,
      },
    };

    const UpdateReg = await Registration.updateOne(
      { _id: ObjectId(id) },
      updatedInfo
    );

    res.status(200).json(UpdateReg);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllRegistration = asyncHandler(async (req, res) => {
 
  try {
    const messages = await Registration.find({});

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const getTeacherApplication = asyncHandler(async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const skip = (page - 1) * pageSize;

    const messages = await Registration.aggregate([
      { $match: { regType: "teacher-application" } },
      {
        $project: {
          phoneNumber: 1,
          address: 1,
          age: 1,
          'user': 1,
          teacherInfo: 1,
          updatedAt:1
        }
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(pageSize) }
    ]);

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// const getTeacherFinal= asyncHandler(async (req, res) => {
//   try {
//     const { page = 1, pageSize = 10 } = req.query;

//     const skip = (page - 1) * pageSize;

//     const messages = await Registration.aggregate([
//       { $match: { regType: "teacher-final" } },
//       {
//         $project: {
//           phoneNumber: 1,
//           address: 1,
//           age: 1,
//           'user': 1,
//           teacherInfo: 1,
//           updatedAt:1
//         }
//       },
//       { $skip: skip },
//       { $limit: parseInt(pageSize) }
//     ]);

//     res.json(messages);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
const getTeacherFinal = asyncHandler(async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const skip = (page - 1) * pageSize;

    const messages = await Registration.aggregate([
      { $match: { regType: "teacher-final" } },
      {
        $project: {
          phoneNumber: 1,
          address: 1,
          age: 1,
          'user': 1,
          teacherInfo: 1,
          updatedAt: 1
        }
      },
      { $sort: { updatedAt: -1 } }, // Sort by updatedAt in descending order
      { $skip: skip },
      { $limit: parseInt(pageSize) }
    ]);

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getTeacherInterview= asyncHandler(async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const skip = (page - 1) * pageSize;

    const messages = await Registration.aggregate([
      { $match: { regType: "teacher-interview" } },
      {
        $project: {
          phoneNumber: 1,
          address: 1,
          age: 1,
          'user': 1,
          teacherInfo: 1,
          updatedAt:1
        }
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(pageSize) }
    ]);

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const getSingleUserReg = asyncHandler(async (req, res) => {
  try {
    const Reg = await Registration.findOne({
      'user.email': req?.params?.email,
    });

    res.status(201).json({
      success: true,
      data: Reg,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get Reg data',
    });
  }
});
const getSingleUserRegId = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const query = { _id: ObjectId(id) };
    // console.log(id);
    const Reg = await Registration.findOne(query);

    res.status(201).json({
      success: true,
      data: Reg,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get Reg data',
    });
  }
});

const SingleUserRegDelete = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const query = { _id: ObjectId(id) };

    const UserRegDelete = await Registration.deleteOne(query);

    res.status(201).json({
      success: true,
      data: UserRegDelete,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = {
  createRegistration,
  getAllRegistration,
  RegistrationUpdate,
  getSingleUserReg,
  SingleUserRegDelete,
  getSingleUserRegId,
 RegistrationUpdateById,
 getTeacherApplication,
 getTeacherFinal,
 getTeacherInterview
};
