const express = require('express')
const router = express.Router()
const Joi = require('joi');

const books = [
    {
        id: 1,
        name: 'Book One',
        author: 'Mohamed',
        titile: 'about black sin',
        price: 10,
        cover: 'soft cover'

    },
    {
        id: 2,
        name: 'Book Two',
        author: 'Ahmed',
        titile: 'about black sin',
        price: 10,
        cover: 'soft cover'
    },
    {
        id: 3,
        name: 'Book Three',
        author: 'Sara',
        titile: 'about black sin',
        price: 10,
        cover: 'soft cover'
    }
];

// HTTP methods/verbs

/**
 * @method get 
 * @public accses
 * @description get all books
 * @routs /api/books
**/

router.get('/', (req, res) => {
    res.status(200).json(books);
});
/**
 * @method get 
 * @public accses
 * @description get book by id
 * @routs /api/books/id
**/

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        res.status(200).json(book);
    } else {

        res.status(404).json('this id not vaild a book');

    }

});

/**
 * @method post 
 * @public accses
 * @description create new booke
 * @routs /api/books
**/





function schemaٍValiditon(opj) {

    const schema = Joi.object({
        titile: Joi.string().trim().min(3).max(30).required(),
        name: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().min(3).max(30).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().min(3).max(30).required(),
    })

    return schema.validate(opj)

}



router.post('/', (req, res) => {
    const { error } = schemaٍValiditon(req.body)



    if (error) {
        return res.status(400).json(error.details[0].message)
    }


    const book = {
        id: books.length + 1,
        titile: req.body.titile,
        name: req.body.name,
        cover: req.body.cover,
        price: req.body.price,
        author: req.body.author
    }

    books.push(book)

    res.status(201).json(book)

});


/**
 * @method put 
 * @public accses
 * @description put booke
 * @routs /api/books/:id
**/



function schemaٍValiditonupdate(opj) {

    const schema = Joi.object({
        titile: Joi.string().trim().min(3).max(30),
        name: Joi.string().trim().min(3).max(30),
        author: Joi.string().trim().min(3).max(30),
        price: Joi.number().min(0),
        cover: Joi.string().trim().min(3).max(30),
    })

    return schema.validate(opj)

}



router.put('/:id', (req, res) => {
    const { error } = schemaٍValiditonupdate(req.body)



    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
    res.status(201).json('booke has ben update')
    }else{
    res.status(404).json('this booke is note a found')
    }

    books.push(book)


});

/**
 * @method delete 
 * @public accses
 * @description delete by booke
 * @routs /api/books/:id
**/




router.delete('/:id', (req, res) => {

    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
    res.status(201).json("booke is delite")
    }else{
    res.status(404).json('this booke is note a found')
    }

});


module.exports = router