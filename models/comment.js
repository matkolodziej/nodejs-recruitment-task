var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        default: ''
    },
    movie: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    }
});

module.exports = mongoose.model('Comment', CommentSchema);