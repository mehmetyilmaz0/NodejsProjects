const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  const promise = Movie.aggregate([
      {
          $lookup: {
              from: 'directors',
              localField: 'directorID',
              foreignField: '_id',
              as: 'Directors'
          }
      },
      {
          $unwind: {
              path: '$directors',
              preserveNullAndEmptyArrays: true
          }
      }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/between/:start_year/:end_year', (req, res) => {
    const {start_year, end_year} = req.params;
    const promise = Movie.find(
        {
            year:{"$gte": parseInt(start_year), "$lte": parseInt(end_year)}
        }
    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/top10', (req, res, next) => {
    const promise = Movie.find({}).limit(10).sort({imdbScore: -1});

    promise.then((data) => {

        if(!data)
            next({message: 'The film was not found!!', code: 99});

        res.json(data)
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
   const promise = Movie.findById(req.params.movie_id);

   promise.then((movie) => {

       if(!movie)
           next({message: 'The film was not found!!', code: 99});

      res.json(movie)
   }).catch((err) => {
       res.json(err);
   });
});

router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((movie) => {

        if(!movie)
            next({message: 'The film was not found!!', code: 99});

        res.json(movie)
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {

        if(!movie)
            next({message: 'The film was not found!!', code: 99});
        else
            res.json(req.params.movie_id + ' -> This film was delete!!')

    }).catch((err) => {
        res.json(err);
    });
});


router.post('/', (req, res, next) => {
  const {title, imdbScore, category, country, year, directorID} = req.body;

  const movie = new Movie({
        title: title,
        imdbScore: imdbScore,
        category: category,
        country: country,
        year: year,
        directorID: directorID
  });


  // Veri Kaydetme 1.Yontem Start
/*
  movie.save((err, data) => {

    if(err)
      res.json(err);
    else
      res.json(data);

  });
*/
  // Veri Kaydetme 1.Yontem End


  // Veri Kaydetme 2.Yontem Start
  const promise = movie.save();
  promise.then((data) => {
    res.json({data});
  }).catch((err) => {
    res.json({err});
  });
  // Veri Kaydetme 2.Yontem End

});

module.exports = router;
