// require the express package for the router
const router = require('express').Router();
// connect to the database
const sequelize = require('../config/connection');
// require the Post and User Models
const { Post, User, Comment } = require('../models');

// route to get the homepage and render it from the handlebars view
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_comment', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // serialize the entire array of the posts in the datbase
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    // check if the user is logged in if they are send them to the homepage if not direct them to the login page
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req,res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id','post_comment','title','created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this ID' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('singlepost', { post });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;