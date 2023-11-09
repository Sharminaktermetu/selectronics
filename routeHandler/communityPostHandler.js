const express = require('express');
const { default: mongoose } = require('mongoose');
const { createCommunityPost, getAllCommunityPost, deleteCommunityPost, commentUpdate,likeUpdate } = require('../controllers/communityPostController');
const router = express.Router();

router.route('/').post(createCommunityPost).get(getAllCommunityPost).delete(deleteCommunityPost).put(commentUpdate);
router.route('/:id').delete(deleteCommunityPost)
router.route('/comment/:id').put(commentUpdate);
router.route('/like/:id').put(likeUpdate);

module.exports = router;