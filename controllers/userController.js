const express = require('express');
const otpGenerator = require('otp-generator')
const User = require('../models/User');
const router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { sendinfo } = require('../functions/sendmail');
const JWT_SECRET = "shhhh";
const temp = async(name,email)=>{
    var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'shashank2110038@akgec.ac.in',
        pass: 'mvqgdfcfnmkfqlay'
        //pass: 'opwkndyvjzvwadhc'
    }
    }));

    var mailOptions = {
    from: 'Shashank',
    to: email, 
    subject: "SankatMochak",
    html: `Hello <b>${name}</b>, <br>Thank you for Joining Us <br/>We are available to help to 24*7 <br/> <br/> <br/><b>Team Sankatmochak </b>`
    };

   await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 
   // res.status(200).json({msg:"asdf"}) 
}

const signUp = async (req, res) => {

    let success = false;
    // if there are errors then check error and rwturn bad request and that error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check weather user with this email already exist
    try {
      

        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
        }
        console.log("hey")
       
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            restate: req.body.state,
            password: securePassword,
        });
        const  name = req.body.name;
      const  email = req.body.email;
        temp(name,email)
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

        
        // temp(req.body.name,req.body.email);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}
const signIn = async (req, res) => {
    let success = false;
    // if there are errors then check error and rwturn bad request and that error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;


    try {

        let user = await User.findOne({ email });
        const name = user.name;
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try login with correct crendentials" });
            
        }

        const passwordcheck = await bcrypt.compare(password, user.password);
        if (!passwordcheck) {
            success = false
            return res.status(400).json({ success, error: "Please try login with correct crendentials" });

        }

        const data = {
            user: {
                id: user.id
            }
        }
        sendinfo(name,email);
        const verificationtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, verificationtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

}

module.exports = { signUp, signIn };