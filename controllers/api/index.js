// require the express router
const router = require('express').Router();
const { User } = require('../../models');
// set up variables to require and hold the designated routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// middleware to be a prefix to the designated routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);


// export the router
module.exports = router;