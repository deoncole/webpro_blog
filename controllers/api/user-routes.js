// require the express router
const router = require('express').Router();
// require the user from the models folder which will be used to access the database
const {User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// set up the api routes that will be used for CRUD to the user table. GET all the users, GET the user by id, add a new user through POST, UPDATE the user through PUT, and DELETE the user.
router.get('/', (req,res) => {
    // use sequelize .findAll() to get all of the users
    User.findAll({
        attributes:{ exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req,res) => {
    // use sequelize .findOne() to get one user
    User.findOne({
        attributes:{ exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_comment', 'created_at']
            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                model: Post,
                attributes: ['title']
              }
            }
          ]
    })
    // check the promise, if false show error message if true respond with json data
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No User found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res) => {
    // use sequelize .create() add a user
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    // check the promise, if false show error message if true respond with json data
    .then(dbUserData => {
        // save the session once the user is logged in
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// route to have the user login. use the post method for access to the req.body
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({ message: 'No User with that Username found!'});
            return;
        }
        const validPw = dbUserData.checkPassword(req.body.password);
        // validate the user
        if(!validPw){
            res.status(400).json({ message:'Incorrect Password!'});
            return;
        }
        // save the session once the user is logged in
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.json({user: dbUserData, message:'You are logged in!!'});
        });
    });
});

router.put('/:id', (req,res) => {
    // use sequelize .update() to update one user's info by their id
    User.update(req.body, {
        individualHooks: true,
        where:{
            id: req.params.id
        }
    })
    // check the promise, if false show error message if true respond with json data
    .then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({message: 'No User found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req,res) => {
    // use sequelize .destroy() to delete one user by their id
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'No User found with that ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/logout', (req,res) => {
    // check if the user is logged in and if so end the session else alert the user
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

// export the router
module.exports = router