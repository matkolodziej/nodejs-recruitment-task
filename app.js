require("./config/config");

// Module imports
const request = require("request");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Models
const Movie = require("./models/movie");
const Comment = require("./models/comment");

// Express & DB init
const app = express();
mongoose.connect(process.env.MONGODB_URI);
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const commentsRoutes = require("./api/routes/comments");
const moviesRoutes = require("./api/routes/movies");

app.use("/comments", commentsRoutes);
app.use("/movies", moviesRoutes);

// Server Listen
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
