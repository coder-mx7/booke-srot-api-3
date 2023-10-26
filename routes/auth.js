const express = require('express')
const { Datauser, ValiditonRijsterUser ,ValiditonLoginUser} = require('../models/Datauser')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router()
const mongoose = require('mongoose');

/**
 * @method post
 * @route api/rejster
 * @access public
 * @description rejster
**/

router.post('/rejster',asyncHandler( async (req, res) => {
    const { error } = ValiditonRijsterUser(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }


    let userr = await Datauser.findOne({ email: req.body.email })

    if (userr) {
        return res.status(404).json({ message: 'this email has alredy reigsterd' })
    }


    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const isAdminn = req.body.isAdminn

    const newlogin = new Datauser({
        username: username,
        email: email,
        password: password,
        isAdminn:isAdminn
    });
    const ruslt = await newlogin.save();
    const {password: hashedPassword, ...other} = ruslt._doc;
    const token = null
    res.status(201).json({ other, token });
}))


/**
 * @method post
 * @route api/login
 * @access public
 * @description login
**/

router.post('/login', asyncHandler( async (req, res) => {
    const { error } = ValiditonLoginUser(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }


    let userr = await Datauser.findOne({ email: req.body.email })

    if (!userr) {
        return res.status(400).json({ message: 'this email or password not found' })
    }


    const ispasswordMACH = await bcrypt.compare(req.body.password,userr.password) 


    if (!ispasswordMACH) {
        return res.status(400).json({ message: 'this email or password not found' })
    }

    const {password: hashedPassword, ...other} = userr._doc;
    const token = jwt.sign({_id:userr.id,isAdminn:userr.isAdminn},process.env.Jwt_Secret_Key)
    res.status(200).json({ other, token });
}))






module.exports = router
