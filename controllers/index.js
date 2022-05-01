// require the express router
const router = require('express').Router();

// variable to hold the prefix to all of the routes
const apiRoutes = require('./api');

// middleware to set the prefix for the routes
router.use('/api', apiRoutes);

// middleware to check if the request if valid
router.use((req, res) => {
    res.status(404).end();
  });

// export the router
module.exports = router;