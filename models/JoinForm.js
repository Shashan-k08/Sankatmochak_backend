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
    about: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


const Regform = mongoose.model('form',JoinSchema);
Regform.createIndexes();
module.exports= Regform