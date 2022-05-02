// require the express package
const express = require('express');
// require the controllers folder to access the routes
const routes = require('./controllers');
// require the sequelize connection to the database
const sequelize = require('./config/connection');
// require the path to access other files
const path = require('path');
// require express handlebars package
const exphbs = require('express-handlebars');
// variable to hold the handlebars
const hbs = exphbs.create({});

//variable to access the express server
const app = express();
// set up the port for the database
const PORT = process.env.PORT || 3001;

// middleware for the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//access the files in the public directory
app.use(express.static(path.join(__dirname, 'public')));

// set the server to use the routes
app.use(routes);

// set express to use handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// connect to the server and database through the sync()
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
