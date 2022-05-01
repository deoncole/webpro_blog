// require the Models to access the data
const User = require('./User');
const Post = require('./Post');

// create associations to how the tables will relate to each other setting the user and post ids as foreign keys
User.hasMany( Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// export the modelnpm start objects
module.exports = {User, Post}