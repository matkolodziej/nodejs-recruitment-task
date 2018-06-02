const express = require("express"),
  router = express.Router();
// Model
const Comment = require("../../models/comment");

router.post("/:movieId", (req, res) => {
  if (req.body.comment == "") {
    throw new Error("Comment body must be provided.");
  }
  let newComment = {
    body: req.body.comment,
    movie: {
      id: req.params.movieId
    }
  };
  Comment.create(newComment)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});
router.get("/", (req, res) => {
  Comment.find({})
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(e => {
      res.status(400).send();
    });
});
router.get("/:movieId", (req, res) => {
  Comment.find({
    "movie.id": req.params.movieId
  })
    .then(comments => {
      res.json(comments);
    })
    .catch(e => {
      res.status(400).send();
    });
});

module.exports = router;
