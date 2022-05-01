// require the express package
const express = require('express');
// require the controllers folder to access the routes
const routes = require('./controllers');
// require the sequelize connection to the database
const sequelize = require('./config/connection');

//variable to access the express server
const app = express();
// set up the port for the database
const PORT = process.env.PORT || 3001;

// middleware for the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// set the server to use the routes
app.use(routes);

// connect to the server and database through the sync()
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
