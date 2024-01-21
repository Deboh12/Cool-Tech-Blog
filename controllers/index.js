const router = require('express').Router();

// Importing route files
const commentApiRoutes = require('./api/commentApiRoutes');
const postApiRoutes = require('./api/postApiRoutes');
const userApiRoutes = require('./api/userApiRoutes');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');

// Using routes
router.use('/api/comments', commentApiRoutes);
router.use('/api/posts', postApiRoutes);
router.use('/api/users', userApiRoutes);
router.use('/comments', commentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;
