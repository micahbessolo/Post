const mongoose = require('mongoose')

const formsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    formDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('form', formsSchema)