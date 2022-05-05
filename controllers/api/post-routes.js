// require the router
const router = require('express').Router();
// require the models
const { Post, User, Comment } = require('../../models');

// set up the api routes that will be used for CRUD to the post table. GET all the posts, GET the post by id, add a new post through POST, UPDATE the post through PUT, and DELETE the post.
router.get('/', (req,res)=>{
    // use sequelize .findAll() to get all of the posts only pulling the designated attributes and order by descending
    Post.findAll({
        attributes: ['id', 'post_comment', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        // join in the user table on the username using include
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    // use sequelize .findOne() to get one post by its id and display by the disignated attributes
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_comment', 'title', 'created_at'],
        // join the user table by the username
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
        if(!dbPostData){
            res.status(404).json({ message: "No Post found with this ID!"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    // use sequelize .create() to add a post
    Post.create({
        title: req.body.title,
        post_comment: req.body.post_comment,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    // use sequelize .update() to update one post's info by its id
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this ID' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // use sequelize .destroy() to delete one post by its id
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//export the router
module.exports = router;