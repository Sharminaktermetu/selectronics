const asyncHandler = require("express-async-handler");
const communityPostSchema = require("../schemas/communityPostSchema");
const mongoose = require("mongoose");
const CommunityPost = new mongoose.model("CommunityPost", communityPostSchema);
/* Post */
const createCommunityPost = asyncHandler(async (req, res) => {
  try {
    const newCommunityPost = await CommunityPost.create({ ...req.body });

    
    

    res.status(200).json({
      success: true,
      message: "ClassRoom has been created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllCommunityPost = asyncHandler(async (req, res) => {
  try {
    const communityPost = await CommunityPost.find({});

    res.status(201).json({
      success: true,
      data: communityPost,
    });
  } catch (error) {
    
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});
/* comment update */
const commentUpdate=asyncHandler(async(req,res)=>{
    try{
      const id = req.params.id;
      var comment = {name: req.body.name, comment: req.body.comment, avatar: req.body.avatar};
      const data= await CommunityPost.findOne({_id :id});
      data.comments.push(comment);
      data.save();

      res.status(201).json({
        success: true,
        data: data,
      });

    }catch(error){
      
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
    }
});
/* like update */
const likeUpdate = asyncHandler(async(req,res)=>{
    try{
      const id = req.params.id;
      var like = {email: req.body.email};
      const data= await CommunityPost.findOne({_id :id});
      data.likes.push(like);
      data.save();

      res.status(201).json({
        success: true,
        data: data,
      });

    }catch(error){
      
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
    }
});

/* delete */
const deleteCommunityPost = asyncHandler(async (req, res) => {
  try {
    const data = await CommunityPost.deleteOne({ _id: req.params.id });
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

module.exports = { createCommunityPost, getAllCommunityPost, deleteCommunityPost,commentUpdate,likeUpdate };
