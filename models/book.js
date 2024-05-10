const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: [{userId: String, grade: Number}], required: false},
    averageRating: { type: Number, required: false}
});

module.exports = mongoose.model('Book', bookSchema);