// require the express router
const router = require('express').Router();
const { User } = require('../../models');
// set up variables to require and hold the designated routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// middleware to be a prefix to the designated routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);


// export the router
module.exports = router;