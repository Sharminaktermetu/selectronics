const asyncHandler = require('express-async-handler');
const bookSchema = require('../schemas/bookSchema');
const mongoose = require('mongoose');
const Book = new mongoose.model('Book', bookSchema);
const ObjectId = require('mongodb').ObjectId;
const User = require('../schemas/userSchema');
const jsonwebtoken = require('jsonwebtoken');
const createbook = asyncHandler(async (req, res) => {
  try {
    const newbook = await Book.create({
      ...req.body,
    });
    // await newbook.save();
    ;

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

const getAllbook = asyncHandler(async (req, res) => {
  try {

    
    const books = await Book.find({}).select(
      "-fileLink"
    );
   

    res.status(201).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
const getSingleBook = asyncHandler(async (req, res) => {
  const { authorization } = req?.headers
  
  const id = req.params.id;
  const query = { _id: ObjectId(id) };

  try {
    if (authorization && authorization?.startsWith('Bearer')) {

      const token = authorization?.split(" ")[1]
      const decoded = jsonwebtoken?.verify(token, process.env.JWT_SECRET)
      const user= await User.findById({_id:decoded.id})
      
      let book
      if(user?.Books?.includes(id)){
         book = await Book.findOne(query);
      }else{
        book = await Book.findOne(query).select(
          "-fileLink"
        )
      }
      
      
      res.status(201).json({
        success: true,
        data: book,
      });
    } else {
      let book = await Book.findOne(query).select('-fileLink');
      res.status(201).json({
        success: true,
        data: book,
      });
    }


 
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

const getSingleBookDelete = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const query = { _id: ObjectId(id) };

    const BookDelete = await Book.deleteOne(query);

    res.status(201).json({
      success: true,
      data: BookDelete,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
const updateBook = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const data = await Book.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          page: req.body.page,
          description: req.body.description,
          faq: req.body.faq,
          courseCategory: req.body.courseCategory,
          image1: req.body.image1,
          fileLink: req.body.fileLink,
        },
      }
    );

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: 'Something error, can not get updateBook data',
    });
  }
});
module.exports = {
  createbook,
  getAllbook,
  getSingleBook,
  getSingleBookDelete,
  updateBook,
};
