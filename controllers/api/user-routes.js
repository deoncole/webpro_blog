// require the express router
const router = require('express').Router();
// require the user from the models folder which will be used to access the database
const {User} = require('../../models')

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
        }
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
        email: req.body.email,
        password: req.body.password
    })
    // check the promise, if false show error message if true respond with json data
    .then(dbUserData => res.json(dbUserData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to have the user login. use the post method for access to the req.body
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
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
        res.json({user: dbUserData, message:'You are logged in!!'});
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

// export the router
module.exports = router