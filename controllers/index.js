// require the express router
const router = require('express').Router();
// variable to hold the prefix to all of the routes
const apiRoutes = require('./api');
// require the home routes file
const homeRoutes = require('./home-routes.js');
// require the dashboard routes
const dashboardRoutes = require('./dashboard-routes.js');

// middleware to set the prefix for the routes
router.use('/api', apiRoutes);
// prefix for the homepage route
router.use('/', homeRoutes);
// prefix for the dashboard route
router.use('/dashboard', dashboardRoutes);

// middleware to check if the request if valid
router.use((req, res) => {
    res.status(404).end();
  });

// export the router
module.exports = router;