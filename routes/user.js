const express = require('express')
const { User, ValiditonRijsterUser } = require('../models/Datauser')
const asyncHandler = require('express-async-handler')


const router = express.Router()
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    const { error } = ValiditonRijsterUser(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })
    if(user){
        return res.status(400).json({message:'this email has alredy registered'})
    }

    const newlogin = new User({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password,
    });
    await newlogin.save();
    res.status(201).json(newlogin);
})






module.exports = router
