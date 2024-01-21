const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

// GET route for dashboard - Display the user's posts
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

// GET route to display the form for adding a new blog post
router.get('/new', withAuth, (req, res) => {
    res.render('newPost', { logged_in: true });
});

// POST route for adding a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to display the form for editing an existing blog post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('editPost', { post, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT route for updating an existing blog post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('editPost', { post, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route for deleting an existing blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id, user_id: req.session.user_id } });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;