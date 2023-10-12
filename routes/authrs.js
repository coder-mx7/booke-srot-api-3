const express = require('express')
const Author = require('../models/Authrs')


const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');


/**
 * @method GET
 * @route api/family
 * @access public
 * @description Get all Families
 */


router.get('/', async (req, res) => {
    getAuthors = await Author.find()
    console.log(getAuthors)
    if (getAuthors) {
        res.json(getAuthors)
    }
})

/**
 * @method GET
 * @route api/family/:id
 * @access public
 * @description Get a specific Family by ID
 */

router.get('/:id', async (req, res) => {

    try {
        id = req.params.id
        getAuthors = await Author.findById(id)
        res.json(getAuthors)
    } catch (error) {
        console.log(error)
    }



})


/**
 * @method POST
 * @route api/family
 * @access public
 * @description Create a new Family
 */

router.post('/', async (req, res) => {
    const { error } = vaildcreate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    nameg = req.body.name
    nomeg = req.body.nome
    ageg = req.body.age
    const newfamily = new Author({
        name: nameg,
        nome: nomeg,
        age: ageg
    });
    await newfamily.save();
    res.json(newfamily);





})
function vaildcreate(opj) {
    const schema = Joi.object({
        name: Joi.string().trim().max(30).min(3).required(),
        nome: Joi.string().trim().max(30).min(3).required(),
        age: Joi.number().max(100).min(12).required(),
    })
    return schema.validate(opj)
}


/**
 * @method PUT
 * @route api/family/:id
 * @access public
 * @description Update a specific Family by ID
 */


router.put('/:id', (req, res) => {
    const { error } = vaildupdate(req.body)

    if (error) {
        res.status(400).json(error.details[0].message)
    }
    id =req.params.id
    const famil = Familiys.put(id)


    if (famil) {
        res.status(200).json('this family has update')
    } else {
        res.status(400).json('this family is not found')
    }
    Familiys.push(famil)
})
function vaildupdate(opj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(30),
        nome: Joi.string().trim().min(3).max(30),
        age: Joi.number().min(3).max(30),
    })
    return schema.validate(opj )
}


/**
 * @method DELETE
 * @route api/family/:id
 * @access public
 * @description Delete a specific Family by ID
 */

router.delete('/:id', async (req, res) => {
    id = req.params.id
    const famil = await Author.findByIdAndDelete(id)

    if (famil) {
        res.status(200).json(famil)
    } else {
        res.status(400).json('this family is not found')
    }
    Familiys.push(famil)

})

module.exports = router
