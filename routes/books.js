const express = require('express')
const router = express.Router()
const {BookeM,schemaٍValiditoncreate,schemaٍValiditonupdate} = require('../models/Bookes')
const asyncHandler = require('express-async-handler')



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









router.post('/', async (req, res) => {
    const { error } = schemaٍValiditoncreate(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    title = req.body.title,
        namee = req.body.name,
        cover = req.body.cover,
        price = req.body.price,
        author = req.body.author

    const book = new BookeM(
        {
            title: title,
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







router.put('/:id', asyncHandler(async (req, res) => {
    const { error } = schemaٍValiditonupdate(req.body)

 

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    let id = req.params.id
    const book = await BookeM.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,

        }
    }, {
        new: true
    })
        res.send(book)



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