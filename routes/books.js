const express = require('express')
const router = express.Router()
const Joi = require('joi');
const BookeM = require('../models/Bookes')
const asyncHandler = require('express-async-handler')

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

router.get('/', async (req, res) => {
    book = await BookeM.find()
    if (book) {
        res.status(200).json(book);
    }
});
/**
 * @method get 
 * @public accses
 * @description get book by id
 * @routs /api/books/id
**/

router.get('/:id', async (req, res) => {

    const id = req.params.id
    const book = await BookeM.findById(id)

    if (book) {
        res.status(200).json(book);
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



router.post('/', async (req, res) => {
    const { error } = schemaٍValiditon(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    titile = req.body.titile,
        namee = req.body.name,
        cover = req.body.cover,
        price = req.body.price,
        author = req.body.author

    const book = new BookeM(
        {
            titile: titile,
            name: namee,
            cover: cover,
            price: price,
            author: author
        }
    )
    await book.save()
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



router.put('/:id', asyncHandler(async (req, res) => {
    const { error } = schemaٍValiditonupdate(req.body)

 

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    let id = req.params.id
    const book = await BookeM.findByIdAndUpdate(id, {
        $set: {
            titile: req.body.titile,

        }
    }, {
        new: true
    })
    if (book) {
        res.send(book)
    }



}));

/**
 * @method delete 
 * @public accses
 * @description delete by booke
 * @routs /api/books/:id
**/




router.delete('/:id', async (req, res) => {

    const id = req.params.id
    const book = await BookeM.findByIdAndDelete(id)
    if (book) {
        res.status(201).json("booke is delite")
    } else {
        res.status(404).json('this booke is note a found')
    }

});


module.exports = router