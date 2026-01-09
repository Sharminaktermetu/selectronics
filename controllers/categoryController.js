const mongoose = require('mongoose');

const categorySchema = require('../schemas/categorySchema');

const Category = new mongoose.model('Category', categorySchema);
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create({ ...req.body });

    res.status(200).json({
      success: true,
      message: 'Category has been created successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'opps ! something went wrong, please try again',
    });
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const Categorys = await Category.find({});

    res.status(201).json({
      success: true,
      data: Categorys,
    });
  } catch (error) {
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

const getSingleCategory = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const data = await Category.findOne({ c_id });

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
const classcategoryPlanUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const CategoryItem = await Category.findOne({ c_id });

    const data = await Category.updateOne(
      { _id: c_id },
      {
        $set: {
          course: [{ ...req.body }, ...CategoryItem.course],
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
const batchCategorydaysPlanUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const CategoryItem = await Category.findOne({ c_id });

    const data = await Category.updateOne(
      { _id: c_id },
      {
        $set: {
          batch: [{ ...req.body }, ...CategoryItem.batch],
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
const LibraryCategorydaysPlanUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const CategoryItem = await Category.findOne({ c_id });

    const data = await Category.updateOne(
      { _id: c_id },
      {
        $set: {
          library: [{ ...req.body }, ...CategoryItem.library],
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
const blogCategorydaysPlanUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    const CategoryItem = await Category.findOne({ c_id });

    const data = await Category.updateOne(
      { _id: c_id },
      {
        $set: {
          blog: [{ ...req.body }, ...CategoryItem.blog],
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
const FAQCategorydaysPlanUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.params.Id;
    
    const CategoryItem = await Category.findOne({ c_id });

    const data = await Category.updateOne(
      { _id: c_id },
      {
        $set: {
          FAQ: [{ ...req.body }, ...CategoryItem.FAQ],
        },
      }
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
/* delete Category course*/
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const data = await Category.update(
      { _id: req.body.Id },
      { $pull: { course: { _id: req.params.id } } },
      { multi: true }
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
/* delete Category Batch*/
const deleteCategoryBatch = asyncHandler(async (req, res) => {
  try {
    const data = await Category.update(
      { _id: req.body.Id },
      { $pull: { batch: { _id: req.params.id } } },
      { multi: true }
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
/* delete Category Library*/
const deleteCategoryLibrary = asyncHandler(async (req, res) => {
  try {
    const data = await Category.update(
      { _id: req.body.Id },
      { $pull: { library: { _id: req.params.id } } },
      { multi: true }
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
/* delete Category Library*/
const deleteCategoryblog = asyncHandler(async (req, res) => {
  try {
    const data = await Category.update(
      { _id: req.body.Id },
      { $pull: { blog: { _id: req.params.id } } },
      { multi: true }
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
/* delete Category faq*/
const deleteCategoryFAQ = asyncHandler(async (req, res) => {
  try {
    const data = await Category.update(
      { _id: req.body.Id },
      { $pull: { FAQ: { _id: req.params.id } } },
      { multi: true }
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
module.exports = {
  createCategory,
  getCategory,
  getSingleCategory,
  classcategoryPlanUpdate,
  batchCategorydaysPlanUpdate,
  LibraryCategorydaysPlanUpdate,
  blogCategorydaysPlanUpdate,
  deleteCategory,
  deleteCategoryBatch,
  deleteCategoryLibrary,
  deleteCategoryblog,
  FAQCategorydaysPlanUpdate,
  deleteCategoryFAQ
};
