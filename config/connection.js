// import and connect to sequelize with the constructor
const Sequelize = require('sequelize');

// require the dotenv package for production deployment
require('dotenv').config();

// gloabl variable to hold the connection and export
let sequelize;

// connect to the database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

// export sequelize
module.exports = sequelize;