const asyncHandler = require('express-async-handler');
const courseSchema = require('../schemas/courseSchema');
const mongoose = require('mongoose');
const Course = new mongoose.model('Course', courseSchema);
const ObjectId = require('mongodb').ObjectId;

const createCourse = asyncHandler(async (req, res) => {
  try {
    const newCourse = await Course.create({
      ...req.body,
    });

    res.status(200).json({
      success: true,
      message: 'Course created Successfully',
      course: newCourse
    });
  } catch (error) {
    res.status(500).json({
      error: 'something wrong, cannot create course',
    });
  }
});

const getAllCourse = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({
      courseType: 'final',
      visibility: 'Public',
    })
      .select([
        '_id',
        'title',
        'image',
        'lesson',
        'durationHr',
        'level',
        'price',
        'salePrice',
        'rating',
        'teacherInfo',
        'medium',
        'likes',
        'category',
        'rank',
        'courseType',
        'review',
        'courseTime',
        'courseSeat',
        'courseDay',
        'singleHighlighter',
        'whatLearn',
        'whatYouGet',
        'courseForWhom',
        'courseWhy'
      ])
      .find({ _id: { $ne: '6300ab9c3429913af039b41a' } });

    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const getAllCourseForAdmin = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({})
      .select([
        '_id',
        'title',
        'image',
        'lesson',
        'durationHr',
        'level',
        'price',
        'salePrice',
        'rating',
        'teacherInfo',
        'medium',
        'likes',
        'category',
        'rank',
        'courseType',
        'review',
        'visibility',
        'courseTime',
        'courseSeat',
        'courseDay',
        'singleHighlighter',
        'whatLearn',
        'whatYouGet',
        'courseForWhom',
        'courseWhy'
      ])
      .find({ _id: { $ne: '6300ab9c3429913af039b41a' } });

    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
const courseUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.body.id;

    console.log(req.body);

    const data = await Course.findOneAndUpdate(
      { _id: ObjectId(c_id) },
      {
        $set: {
          ...req.body,
        },
        $push: { review: req.body.studentReview },
      }
    );

    console.log(data);

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

// get single course

const getSingleCourse = asyncHandler(async (req, res) => {
  try {
    const title = req.params.title;
    // console.log(title);
    const course = await Course.findOne({title:title}).select({
      'curriculum.lessons.quizes': 0,
      'curriculum.lessons.video': 0,
      'curriculum.lessons.note': 0,
    });
    console.log(course);
    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});





//get single course for student
const getSingleCourseforStudent = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: ObjectId(id) }).select([
      '_id',
      'title',
      'subTitle',
      'curriculum',
    ]);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const getCourseBySearch = asyncHandler(async (req, res) => {
  try {
    const keyword = {
      $or: [{ medium: req.body.search }, { category: req.body.search }],
    };

    const course = await Course.find(keyword).select([
      '_id',
      'title',
      'image',
      'lesson',
      'durationHr',
      'level',
      'price',
      'salePrice',
      'rating',
      'teacherInfo',
      'medium',
      'rank',
      'courseTime',
      'courseSeat',
      'courseDay',
      'singleHighlighter',
      'whatLearn',
      'whatYouGet',
      'courseForWhom',
      'courseWhy'
    ]);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get course data',
    });
  }
});

const getSingleForAdmin = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: ObjectId(id) });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

// get many course by filter

const getManyByFilter = asyncHandler(async (req, res) => {
  try {
    const getMany = req.body;

    const courses = await Course.find({
      _id: {
        $in: req?.body?.courseId.map((id) =>
          mongoose.Types.ObjectId(id.trim())
        ),
      },
    })
      .select({
        'curriculum.lessons.quizes': 0,
        'curriculum.lessons.video': 0,
        'curriculum.lessons.note': 0,
      })
      .find({ _id: { $ne: '6300ab9c3429913af039b41a' } });

    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const deleteBlog = await Course.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Deleting Blog',
    });
  }
});

const getCourseForTeacher = asyncHandler(async (req, res) => {
  try {
    const course = await Course.find({
      teacherInfo: { $all: [req.params.email] },
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

const likeUpdate = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Course.findOne({ _id: id });
    data.likes.push(req.body.n);
    data.save();

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
  getAllCourseForAdmin,
  createCourse,
  getAllCourse,
  courseUpdate,
  getSingleCourse,
  getManyByFilter,
  getSingleCourseforStudent,
  getSingleForAdmin,
  deleteCourse,
  getCourseForTeacher,
  getCourseBySearch,
  likeUpdate,
};
