// require the express package for the router
const router = require('express').Router();
// connect to the database
const sequelize = require('../config/connection');
// require the Post and User Models
const { Post, User } = require('../models');

// route to get the homepage and render it from the handlebars view
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id','post_url','title','created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // serialize the entire array of the posts in the datbase
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {posts});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
  });

module.exports = router;