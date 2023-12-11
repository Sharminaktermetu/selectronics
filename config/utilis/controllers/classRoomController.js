const asyncHandler = require('express-async-handler');
const classRoomSchema = require('../schemas/classRoomSchema');
const mongoose = require('mongoose');
const ClassRoom = new mongoose.model('ClassRoom', classRoomSchema);
const ObjectId = require('mongodb').ObjectId;

const createClassRoom = asyncHandler(async (req, res) => {
  try {
    const newClassRoom = await ClassRoom.create({ ...req.body });
    res.status(200).json({
      success: true,
      message: 'ClassRoom has been created successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'opps ! something went wrong, please try again',
    });
  }
});

const getAllClassRoom = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({});

    res.status(201).json({
      success: true,
      data: classRoom,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

const getSingleClassroom = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.classRoomId;
    const query = { _id: c_id };

    const data = await ClassRoom.findOne(query);

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get  data',
    });
  }
});

const classRoomUpdate = asyncHandler(async (req, res) => {
  
  try {
    const c_id = req.params.classRoomId;

    const classItem = await ClassRoom.findOne({"_id": c_id });
    
    

    const data = await ClassRoom.updateOne(
      { _id: c_id },
      {
        $set: {
          video: [{ ...req.body }, ...classItem.video],
          classes: [{ ...req.body.class }, ...classItem.classes],
          ...req.body,
        },
      }
      // {
      //   $set: {
      //     ...req.body.data,
      //     // ...req.body.data,
      //   },
      // }
    );
    
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(501).json({
      error: 'Something error, can not get  data',
    });
  }
});

const getClassRoomTeacher = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({
      assignedTeacher: { $all: [req.params.email] },
    });
    
    res.status(201).json({
      success: true,
      data: classRoom,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

const getClassRoomStudent = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({
      accessedStudent: { $all: [req.params.email] },
    });
    
    res.status(201).json({
      success: true,
      data: classRoom,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Push class note
:::::::::::::::::::::::::::::::::::::::::*/
const pushClassNote = asyncHandler(async (req, res) => {
  try {
    var newData = {
      title: req.body.title,
      note: req.body.note,
      date: req.body.date,
      className: req.body.className,
    };
    const data = await ClassRoom.findOne({ _id: req.params.classRoomId });
    data?.classNote?.push(newData);
    data?.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const getClassNote = asyncHandler(async (req, res) => {
  try {
    const data = await ClassRoom.findOne({
      _id: req.params.classRoomId,
    }).select('classNote');
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get  data',
    });
  }
});
/* delete note*/
const deleteClassNote = asyncHandler(async (req, res) => {
  try {
    // const data = await ClassRoom.deleteOne({ _id: req.params.id });
    const data = await ClassRoom.update(
      { _id: req.body.classRoomId },
      { $pull: { classNote: { _id: req.params.id } } },
      { multi: true }
    );
    // console.log(req.body.classRoomId , req.params.id )

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({

      error: 'Something error, can not get user data',
    });
  }
});

const deleteClass = asyncHandler(async (req, res) => {
  try {
    // const data = await ClassRoom.deleteOne({ _id: req.params.id });
    const data = await ClassRoom.update(
      { _id: req.body.classroomId },
      { $pull: { classes: { _id: req.params.id } } },
      { multi: true }
    );
    ;

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const getAccessedStudents = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({
      _id: req.params.classRoomId,
    }).select('accessedStudent');

    res.status(201).json({
      success: true,
      data: classRoom,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

/* update students((update)) updating classroom */
const updateAssignStudent = asyncHandler(async (req, res) => {
  try {
    
    const data = await ClassRoom.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { 
          // accessedStudent: req.body.student ,
          department: req.body.department,
          slogan: req.body.slogan,
          subject: req.body.subject,
          assignedTeacher: req.body.assignedTeacher,
          roomNo: req.body.roomNo,
          accessedStudent: req.body.accessedStudent,
          image: req.body.image,
        },
      }
    );

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get classRoomFeedBack data',
    });
  }
});

const deleteClassroom = asyncHandler(async (req, res) => {
  try {
    const deleteBlog = await ClassRoom.findByIdAndDelete(
      req.params.classRoomId
    );
    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Deleting Classroom',
    });
  }
});

/* Rating */
const updateRating = asyncHandler(async (req, res) => {
  try {
    const data = await ClassRoom.findOneAndUpdate(
      { 
        _id: req.params.classRoomId,
        'classes._id': req.body.classId
      },
      {
        'classes.$.rating': req.body.rating,
        'classes.$.total': req.body.total,
      }
    );
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    ;
    res.status(401).json({
      error: 'Something error,',
    });
  }
});

/* update students((update)) */
const updateClass = asyncHandler(async (req, res) => {
  try {
    const data = await ClassRoom.findOneAndUpdate(
      { 
        _id: req.params.classRoomId,
        'classes._id': req.body.classId
      },
      {
        'classes.$.className': req.body.className,
        'classes.$.hour': req.body.hour,
        'classes.$.image': req.body.image,
        'classes.$.minute': req.body.minute,
        'classes.$.selectedDays': req.body.selectedDays,
        'classes.$.studentGuide': {
          acceptable: req.body.studentGuide.acceptable,
          notAcceptable: req.body.studentGuide.notAcceptable,
        },
        'classes.$.teacherGuide': {
          classTopic: req.body.teacherGuide.classTopic,
          concerningIssue: req.body.teacherGuide.concerningIssue,
        },
        'classes.$.teacherEmail': req.body.teacherEmail,
        'classes.$.timeSlot': req.body.timeSlot,
        'classes.$.zoomLink': req.body.zoomLink,
        'classes.$.startingDate': req.body.startingDate,
        'classes.$.rating': req.body.rating,
        'classes.$.total': req.body.total,
      }
    );

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get classRoomFeedBack data',
    });
  }
});



module.exports = {
  createClassRoom,
  getAllClassRoom,
  getClassRoomTeacher,
  getClassRoomStudent,
  classRoomUpdate,
  getSingleClassroom,
  pushClassNote,
  getClassNote,
  deleteClassNote,
  getAccessedStudents,
  deleteClass,
  deleteClassroom,
  updateAssignStudent,
  updateRating,
  updateClass
};
