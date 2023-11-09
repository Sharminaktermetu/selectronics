const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const AWS = require('aws-sdk');
const config = require('../config/config');
const blogsSchema = require('../schemas/blogsSchema');
const Blog = new mongoose.model('Blog', blogsSchema);
// // digital ocean connnection
// const spaces = new AWS.S3({
//   endpoint: new AWS.Endpoint(config.spaces.url),
//   accessKeyId: config.spaces.accessKeyId,
//   secretAccessKey: config.spaces.secretAccessKey,
// });

// Post Blog

const insertBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
    });
    res.status(200).json({
      success: true,
      message: 'book created Successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

// BlogUpdate

const BlogUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.blogId;
    const data = await Blog.updateOne(
      { _id: c_id },
      {
        $set: {
          ...req.body,
        },
      }
    );

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

// Get All Blog

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlogData = await Blog.find({});
    res.status(200).json(getAllBlogData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting All Blog',
    });
  }
});

// Get Single Blog

const getSingleBlog = asyncHandler(async (req, res) => {
  try {
    const getSingleBlogData = await Blog.findById(req.params.blogId);
    res.status(200).json(getSingleBlogData);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Getting Single Blog',
    });
  }
});
// Get Single Blog email

const getSingleBlogPar = asyncHandler(async (req, res) => {
  try {
    const Reg = await Blog.findOne({
      blogTitle: req?.params?.blogTitle,
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

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({
      message: 'Failed Deleting Blog',
    });
  }
});

module.exports = {
  insertBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  BlogUpdate,
  getSingleBlogPar,
};
