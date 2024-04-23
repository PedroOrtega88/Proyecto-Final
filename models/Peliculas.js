const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imdbRating: {
        type: Number,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    }
});
const Peliculas = mongoose.model('Peliculas', PeliculaSchema);

module.exports = Peliculas;

