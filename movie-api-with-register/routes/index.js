const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/authenticate', (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({
    username: username
  }, (err, user) => {

    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: 'Authentication failed, user not found '
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: 'Authentication failed, password is wrong '
          });
        } else {

          const payload = {
            username: username
          };

          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat
          });

          res.json({
            status: true,
            token: token
          });
        }
      });
    }

  });
});

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then(function(hash) {
    const user = new User({
      username: username,
      password: hash
    });

    const promise = user.save();

    promise.then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
  });
});


module.exports = router;
