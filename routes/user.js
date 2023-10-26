const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const router = express.Router()
const { Datauser, ValiditonUpdate } = require('../models/Datauser')
const {verifyToken} = require('../middleware/vrify')

/**
 * @method put
 * @route api/user
 * @access private
 * @description rejster
**/

router.put("/:id",verifyToken, asyncHandler(async (req, res) => {

    if(req.user.id!==req.params.id){
        return res.status(403).json({message:"You are not allowed, you anly can update your profile "})
    }

    const { error } = ValiditonUpdate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const updateuser = await Datauser.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        },
    }, {
        new: true
    }).select('-password')

    res.status(200).json(updateuser)

}))

module.exports = router