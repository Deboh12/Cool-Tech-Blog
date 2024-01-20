const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

// GET route for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: Comment, include: [User] }, User]
        });
        const posts = userPosts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add other routes for editing, deleting, and adding new posts

module.exports = router;