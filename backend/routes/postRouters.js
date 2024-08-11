const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controller/postController');

router.post('/create', auth, createPost);
router.get('/', getPosts);

module.exports = router;
