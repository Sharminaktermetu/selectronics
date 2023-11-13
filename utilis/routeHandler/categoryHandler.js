const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createCategory,
  getCategory,
  getSingleCategory,
  classcategoryPlanUpdate,
  batchCategorydaysPlanUpdate,
  deleteCategory,
  deleteCategoryBatch,
  LibraryCategorydaysPlanUpdate,
  blogCategorydaysPlanUpdate,
  deleteCategoryLibrary,
  deleteCategoryblog,
  FAQCategorydaysPlanUpdate,
  deleteCategoryFAQ
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(createCategory).get(getCategory);

router.route('/single/:Id').get(getSingleCategory);
router.route('/course/:Id').put(classcategoryPlanUpdate);
router.route('/batch/:Id').put(batchCategorydaysPlanUpdate);
router.route('/library/:Id').put(LibraryCategorydaysPlanUpdate);
router.route('/blog/:Id').put(blogCategorydaysPlanUpdate);
router.route('/FAQ/:Id').put(FAQCategorydaysPlanUpdate);
router.route('/coursedelete/:id').put(deleteCategory);
router.route('/batchdelete/:id').put(deleteCategoryBatch);
router.route('/librarydelete/:id').put(deleteCategoryLibrary);
router.route('/blogdelete/:id').put(deleteCategoryblog);
router.route('/FAQDelete/:id').put(deleteCategoryFAQ);

module.exports = router;
