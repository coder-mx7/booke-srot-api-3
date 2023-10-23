const express = require('express')
const Author = require('../models/Authrs')
const asyncHandler = require('express-async-handler') 

const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');


/**
 * @method GET
 * @route api/family
 * @access public
 * @description Get all Families
 */


router.get('/', asyncHandler(async (req, res) => {
    getAuthors = await Author.find()
    console.log(getAuthors)
    if (getAuthors) {
        res.json(getAuthors)
    };
}) )

/**
 * @method GET
 * @route api/family/:id
 * @access public
 * @description Get a specific Family by ID
 */

router.get('/:id',  async (req, res) => {

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

router.post('/', asyncHandler(  async (req, res) => {
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
}))
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
**/


router.put('/:id', asyncHandler( async(req, res) => {
    const { error } = vaildupdate(req.body)

    if (error) {
        res.status(400).json(error.details[0].message)
    }
    id =req.params.id
    const famil = await Author.findByIdAndUpdate(id,{
        $set:{
            name:req.body.name,
            nome:req.body.nome,
            age:req.body.age,
        }
    },{
        new:true
    })
    if(famil){
        res.send(famil)
    }


   
}))
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

router.delete('/:id',asyncHandler  (async (req, res) => {
    id = req.params.id
    const famil = await Author.findById(id)

    if (famil) {
         famil = await Author.findByIdAndDelete(id)
    } else {
        res.status(400).json('this family is not found')
    }

}))

module.exports = router
