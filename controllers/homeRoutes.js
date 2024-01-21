const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET route for the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }]
                }
            ],
            order: [['createdAt', 'DESC']] // Order posts by creation date
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('home', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for viewing a single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('singlePost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;