// require the Models to access the data
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations to how the tables will relate to each other setting the user and post ids as foreign keys
User.hasMany( Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


// export the modelnpm start objects
module.exports = { User, Post, Comment };