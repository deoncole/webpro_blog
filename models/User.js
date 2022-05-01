// require the connection
const sequelize = require('../config/connection');
// require bcrypt package
const bcrypt = require('bcrypt');
// require the Model and Datatypes to build the Model for the sequelize table
const { Model, DataTypes } = require('sequelize');

// create the user Model
class User extends Model {
    // this method is used to check the has password by running on instance data of each user. Compare the two passwords and return true or false
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
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
        // use hooks to hash the users password before the user is created. 
        hooks: {
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            // use the hook for when the user is updated
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // set up the table config options, passing in the sequelized connection, not to automatically timestamp, not to pluralize the table name, use underscores, and keep the model's name lowercase
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;