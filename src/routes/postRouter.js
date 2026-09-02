/**
 * Heart2Heart - Post Router
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Show create post page
router.get('/new', postController.getNewPostPage);

// Create new post
router.post('/', postController.createPost);

// View single post
router.get('/:id', postController.getPostDetail);

// Add reaction
router.post('/:id/reactions', postController.addReaction);

// Add comment
router.post('/:id/comments', postController.addComment);

// Toggle bookmark
router.post('/:id/bookmark', postController.toggleBookmark);

// Delete post
router.post('/:id/delete', postController.deletePost);

module.exports = router;
