const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
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
