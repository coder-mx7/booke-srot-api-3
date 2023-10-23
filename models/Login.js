const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    user: String,
    password: String,
},{
    timestamps: true
});

const datalogin = mongoose.model('datalogin', authorSchema);

module.exports = datalogin;