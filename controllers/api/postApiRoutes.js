const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../config/middleware/isAuthenticated');

// POST route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET route to retrieve all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add routes for updating, deleting, and getting a single post

module.exports = router;
