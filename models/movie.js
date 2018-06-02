var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
  title: String,
  year: String,
  rated: String,
  released: Date,
  runtime: String,
  genre: String,
  director: String,
  writer: String,
  actors: String,
  plot: String,
  language: String,
  country: String,
  awards: String,
  poster: String,
  ratings: [
    {
      source: String,
      value: String
    }
  ],
  metascore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  type: String,
  DVD: String,
  boxOffice: String,
  production: String,
  website: String
});

module.exports = mongoose.model("Movie", MovieSchema);
