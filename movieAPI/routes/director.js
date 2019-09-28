const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', (req, res, next) => {
  res.json({ title: 'Express' });
});

router.post('/', (req, res, next) => {
  const {name, surname, bio, createdAt} = req.body;

  const director = new Director({
    name: name,
    surname: surname,
    bio: bio,
    createdAt: createdAt
  });

  const promise = director.save();
  promise.then((director) => {
    res.json({director})
  }).catch((err) => {
    res.json({err});
  });
});

module.exports = router;
