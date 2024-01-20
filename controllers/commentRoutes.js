const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

// Routes related to comment views (if any) go here
// Example: Viewing a specific comment, editing a comment page, etc.

module.exports = router;