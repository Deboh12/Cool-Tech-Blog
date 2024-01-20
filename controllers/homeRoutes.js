
const router = require('express').Router();
const { Post, User } = require('../models');

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User]
    });
    // Logic to render posts
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;