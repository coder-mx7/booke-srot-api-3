const { boolean } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 50,
        minlength: 5,
    },
    username: {
        type: String, 
        trim: true,
        maxlength: 50,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 6,
    },

}))
const Datauser =  mongoose.Schema('user', UserSchema)




//validit regster

function ValiditonRijsterUser(opj) {

    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(30).required(),
        username: Joi.string().trim().min(3).max(30).required(),
        password: Joi.string().trim().min(6).max(30).required(),
        isAdmin:Joi.bool()
    })

    return schema.validate(opj)

}

//validit login

function ValiditonLoginUser(opj) {

    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(30).required(),
        password: Joi.string().trim().min(6).max(30).required(),
    })

    return schema.validate(opj)

}
//validit regster

function ValiditonUpdate(opj) {

    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(30).required(),
        username: Joi.string().trim().min(3).max(30).required(),
        password: Joi.string().trim().min(6).max(30).required(),
        isAdmin:Joi.bool()
    })

    return schema.validate(opj)

}

module.exports = {
    Datauser,
    ValiditonRijsterUser,
    ValiditonLoginUser,
    ValiditonUpdate
}




