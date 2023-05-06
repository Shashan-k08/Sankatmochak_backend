const express = require('express');
const otpGenerator = require('otp-generator')
const User = require('../models/User');

const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "shhhh";

const signUp = async (req, res) => {
   
    let success = false;
    // if there are errors then check error and rwturn bad request and that error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check weather user with this email already exist
    try {


        // let user = await User.findOne({ email: req.body.email });
        // console.log(user);
        // if (user) {
        //     return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
        // }
console.log("hey")
        // const salt = await bcrypt.genSalt(10);
        // const securePassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            restate:req.body.restate,
            password: req.body.password,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const verificationtoken = jwt.sign(data, JWT_SECRET);

        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'Please enter a unique value for email'})})
        success = true;
        res.json({ success, verificationtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = { signUp };