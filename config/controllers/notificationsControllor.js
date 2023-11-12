const asyncHandler = require('express-async-handler');
const notificationsSchema = require('../schemas/notificationsSchema');
const mongoose = require('mongoose');
const Notification = new mongoose.model('Notification', notificationsSchema);

// Get Single notification

const getSinglenotification = asyncHandler(async (req, res) => {
  
  try {
    const getSinglenotificationData = await Notification.find({
      assignedStudentEmail: { $in: [req.params.notificationemail] },
      //  assignedTeacherEmail: { $in: [req.params.notificationemail] },
    });
    // const getSinglenotificationData = await Notification.find({
    //   assignedStudentEmail: [req.params.notificationemail],
    // });
    
    // findById(
    //   req.params.notificationemail
    // );
    res.status(200).json(getSinglenotificationData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting Single notification',
    });
  }
});

// Get Single notification

const getSinglenotificationTeacher = asyncHandler(async (req, res) => {
  
  try {
    const getSinglenotificationData = await Notification.find({
      assignedTeacherEmail: { $in: [req.params.notificationemail] },
    });
    // const getSinglenotificationData = await Notification.find({
    //   assignedStudentEmail: [req.params.notificationemail],
    // });
    
    // findById(
    //   req.params.notificationemail
    // );
    res.status(200).json(getSinglenotificationData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting Single notification',
    });
  }
});
/* Post */
const createnotification = asyncHandler(async (req, res) => {
  try {
    const newnotification = await Notification.create({ ...req.body });
    
    res.status(200).json({
      success: true,
      message: 'notification has been created successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'opps ! something went wrong, please try again',
    });
  }
});
/* get all */
const getAllnotification = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.find({});

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});
/* delete */
const deletenotification = asyncHandler(async (req, res) => {
  try {
    const data = await Notification.deleteOne({ _id: req.params.id });
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

module.exports = {
  createnotification,
  getAllnotification,
  deletenotification,
  getSinglenotification,
  getSinglenotificationTeacher,
};
