// require the express router
const router = require('express').Router();
// set up variables to require and hold the designated routes
const userRoutes = require('./user-routes');

// middleware to be a prefix to the designated routes
router.use('/users', userRoutes);

// export the router
module.exports = router;