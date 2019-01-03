const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    image: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('image', Schema);
module.exports = Image;