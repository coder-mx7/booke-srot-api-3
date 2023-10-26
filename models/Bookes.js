const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 30, },
    name: String,
    cover: String,
    price: Number,
    author: String
});

const BookeM = mongoose.model('BookeM', bookSchema);

function schemaٍValiditoncreate(opj) {

    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        name: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().min(3).max(30).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().min(3).max(30).required(),
    })

    return schema.validate(opj)

}

function schemaٍValiditonupdate(opj) {

    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30),
        name: Joi.string().trim().min(3).max(30),
        author: Joi.string().trim().min(3).max(30),
        price: Joi.number().min(0),
        cover: Joi.string().trim().min(3).max(30),
    })

    return schema.validate(opj)

}


module.exports = {
    BookeM,
    schemaٍValiditoncreate,
    schemaٍValiditonupdate,
};