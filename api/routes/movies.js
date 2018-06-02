const express = require("express"),
  router = express.Router(),
  request = require("request"),
  axios = require("axios");
// Model
const Movie = require("../../models/movie");

async function getMovieByTitle(title, res) {
  if (!title) {
    throw new Error("Title must be provided.");
  } else {
    let movieOMDB = await axios.get(
      `http://www.omdbapi.com/?t=${title}&apikey=10d4f0f4`
    );
    return movieOMDB.data;
  }
}
// Responsible for filtering data, making sure that nothing is missed, misspelled etc.
const filterMovieData = movieData => {
  // Simple fix for array in ratings
  let newRatings = [];
  movieData.Ratings.forEach(rating => {
    newRatings.push({
      source: rating.Source,
      value: rating.Value
    });
  });

  let filteredData = {
    title: movieData.Title,
    year: movieData.Year,
    rated: movieData.Rated,
    released: movieData.Released,
    runtime: movieData.Runtime,
    genre: movieData.Genre,
    director: movieData.Director,
    writer: movieData.Writer,
    actors: movieData.Actors,
    plot: movieData.Plot,
    language: movieData.Language,
    country: movieData.Country,
    awards: movieData.Awards,
    poster: movieData.Poster,
    ratings: newRatings,
    metascore: movieData.Metascore,
    imdbRating: movieData.imdbRatings,
    imdbVotes: movieData.imdbVotes,
    imdbID: movieData.imdbID,
    type: movieData.Type,
    DVD: movieData.DVD,
    boxOffice: movieData.BoxOffice,
    production: movieData.Production,
    website: movieData.Website
    // Response TRUE
  };
  return filteredData;
};

router.post("/", (req, res) => {
  getMovieByTitle(req.body.title, res).then(movie => {
    if (req.body.error) {
      return res.status(400).send(req.body.error);
    }
    Movie.create(filterMovieData(movie))
      .then(movie => {
        res.status(200).send(movie);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });
});
router.get("/:movieId", (req, res) => {
  Movie.findById(req.params.movieId)
    .then(movie => {
      res.status(200).send(movie);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});
router.get("/", (req, res) => {
  Movie.find({})
    .sort({ released: -1 }) // Sorts by release date
    .then(
      movies => {
        res.status(200).send(movies);
      },
      e => {
        res.status(400).send(e);
      }
    );
});

module.exports = router;
