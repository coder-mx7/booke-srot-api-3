const express = require('express')
const datalogin = require('../models/Login')


const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    

    user = req.body.user
    password = req.body.password
    const newdatalogin = new datalogin({
        user: user,
        password: password,
    });
    await newdatalogin.save() ;
    res.json(newdatalogin) ;
})






module.exports = router
