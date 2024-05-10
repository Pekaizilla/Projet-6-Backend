const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: { type: [{userId: String, grade: Number}], required: true},
    averageRating: { type: Number, required: true}
});

module.exports = mongoose.model('Book', bookSchema);