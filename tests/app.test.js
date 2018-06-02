require("../config/config");

const request = require("supertest");
const expect = require("expect");
const mongoose = require("mongoose");
// Functions
const { getMovieByTitle, filterMovieData } = require("../api/routes/movies");

// Models
const Movie = require("../models/movie");
const Comment = require("../models/comment");
// Seed data
const {
  populateComments,
  populateMovies,
  moviesSeedData,
  commentsSeedData,
  movieOneId
} = require("./seedData");

let server = request.agent("http://localhost:3000");

var con = mongoose.connect("mongodb://localhost/nodejs-recruitment-test");

mongoose.connection.dropDatabase(e => {});

describe("Test init", () => {
  before(done => {
    populateMovies();
    populateComments();
    done();
  });
  describe("POST /movies", () => {
    it("should add movie to database and return it", done => {
      const title = "Avengers Infinity War";
      server
        .post("/movies")
        .send(`title=${title}`)
        .expect(200)
        .end((err, res) => {
          // Checks if object is being returned
          expect(res.body.year).toEqual("2018");

          // Checks if object was added to Db
          Movie.find({ _id: res.body._id }).then(movie => {
            expect(movie).toExist;
            done();
          });
        });
    });
    it("should expect error because of missing title", done => {
      server
        .post("/movies")
        .expect(getMovieByTitle)
        .end(done());
    });
  });

  describe("GET /movies", () => {
    it("should fetch list of movies present in database", done => {
      server
        .get("/movies")
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toBeGreaterThan(1);
          done();
        });
    });
    it("should fetch Data by Title of a movie by ID from database", done => {
      server
        .get(`/movies/${movieOneId}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body._id).toEqual(movieOneId.toHexString());
          expect(res.body.year).toBe("2018");
          done();
        });
    });
  });

  describe("POST /comments", () => {
    it("request body should contain ID of a movie present in database", done => {
      server
        .post(`/comments/${movieOneId}`)
        .expect(200)
        .end((err, res) => {
          Movie.find({ _id: movieOneId })
            .then(movie => {
              expect(movie).toExist;
              done();
            })
            .catch(e => done(e));
        });
    });
    it("comment should be saved to application database", done => {
      server
        .post(`/comments/${movieOneId}`)
        .send("comment=Some words")
        .expect(200)
        .end((err, res) => {
          Comment.find()
            .then(comments => {
              expect(comments.length).toBe(5);
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /comments", () => {
    it("should get all comments from database", done => {
      server
        .get("/comments")
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toBeGreaterThan(2);
          done();
        });
    });
    it("should get all comments for defined movie ID", done => {
      server
        .get(`/comments/${movieOneId}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body[1].movie.id).toBe(movieOneId.toHexString());
          expect(res.body.length).toBeGreaterThan(1);
          done();
        });
    });
  });
});
