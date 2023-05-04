const mongoose = require('mongoose');

const { Schema } = mongoose;

const JoinSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    auth_type: {
        type: String,
        required: true
    },
    auth_number: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('form', JoinSchema);