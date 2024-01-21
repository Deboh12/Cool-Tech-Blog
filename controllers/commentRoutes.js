const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

// Route to view a specific comment 
router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: Post }]
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        const comment = commentData.get({ plain: true });
        res.render('viewComment', { comment, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for editing a comment 
router.get('/comment/edit/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        const comment = commentData.get({ plain: true });
        res.render('editComment', { comment, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;