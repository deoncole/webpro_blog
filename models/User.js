// require the connection
const sequelize = require('../config/connection');
// require the Model and Datatypes to build the Model for the sequelize table
const { Model, DataTypes } = require('sequelize');

// create the user Model
class User extends Model {}
// define how the User table will look with the id as a primary key, username, and password no less than 5 characters long
User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[5]
            }

        }
    },
    {
        // set up the table config options, passing in the sequelized connection, not to automatically timestamp, not to pluralize the table name, use underscores, and keep the model's name lowercase
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;