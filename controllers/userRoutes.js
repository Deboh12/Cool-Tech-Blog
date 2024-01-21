const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

// GET route for login page
router.get('/login', (req, res) => {
    // Redirect to dashboard if already logged in
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// GET route for signup page
router.get('/signup', (req, res) => {
    // Redirect to dashboard if already logged in
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});


module.exports = router;