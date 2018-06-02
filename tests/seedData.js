const { ObjectID } = require("mongodb");

const Movie = require("../models/movie");
const Comment = require("../models/comment");

const { getMovieByTitle } = require("../api/routes/movies");

const movieOneId = new ObjectID();
const movieTwoId = new ObjectID();

// Some Data, no need to create rest of it, assertions can be made based on title and year
const moviesSeedData = [
  {
    _id: movieOneId,
    title: "Black Panther",
    year: "2018"
  },
  {
    _id: movieTwoId,
    title: "The Avengers",
    year: "2012"
  }
];

const commentsSeedData = [
  {
    _id: new ObjectID(),
    body: "This movie is great",
    movie: {
      id: movieOneId
    }
  },
  {
    _id: new ObjectID(),
    body: "Movie was average",
    movie: {
      id: movieOneId
    }
  },
  {
    _id: new ObjectID(),
    body: "Great to see this movie",
    movie: {
      id: movieTwoId
    }
  }
];
const populateMovies = done => {
  Movie.insertMany(moviesSeedData)
    .then(() => {
      done();
    })
    .catch(e => {});
};

const populateComments = done => {
  Comment.insertMany(commentsSeedData)
    .then(() => {
      done();
    })
    .catch(e => {});
};

module.exports = {
  populateComments,
  populateMovies,
  moviesSeedData,
  commentsSeedData,
  movieOneId
};
