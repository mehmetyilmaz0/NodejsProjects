const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', (req, res, next) => {
  const promise = Director.aggregate([
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'directorID',
          as: 'movies'
        }
      },
      {
        $unwind: {
          path: '$movies',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies'
          }
        }
      },
      {
        $project: {
          _id: '$_id._id',
          name: '$_id.name',
          surname: '$_id.surname',
          bio: '$_id.bio',
          movies: '$movies'
        }
      }
  ]);

  promise.then((director) => {
    if(!director)
      next({message: 'The film was not found!!', code: 99});

    res.json(director);
  }).catch((err) => {
    res.json(err);
  });

});

router.get('/:director_id', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'directorID',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]);

  promise.then((director) => {
    if(!director)
      next({message: 'The film was not found!!', code: 99});

    res.json(director);
  }).catch((err) => {
    res.json(err);
  });

});

router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((director) => {

    if(!director)
      next({message: 'The director was not found!!', code: 99});

    res.json(director)
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((director) => {

        if(!director)
            next({message: 'The director was not found!!', code: 99});
        else
            res.json(req.params.movie_id + ' -> This director was delete!!')

    }).catch((err) => {
        res.json(err);
    });
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
