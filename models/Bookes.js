const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titile:String,            
    name: String,
    cover: String,
    price: Number,
    author: String
});

const BookeM = mongoose.model('BookeM', bookSchema);

module.exports = BookeM;