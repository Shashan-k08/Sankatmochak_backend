const express = require('express');
const router = express.Router();
const Regform = require("../models/JoinForm");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const temp = async (name, email) => {
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
        subject: "Sankatmochak",
        html: `Hello <b>${name}</b>, <br>We have received a response from you becoming the volunteer of Our organisation <br/> This is your Confirmation mail</> Thanks for joining us<br/> <br/><b> Team SankatMochak</b>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    // res.status(200).json({msg:"asdf"}) 
}

const reguser = async (req, res) => {
    try {  let success = false;
        let user = await Regform.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ success,  error: "Sorry a user with this email already exist" })
        }
        const { name, email, gender, age, about } = req.body;
        console.log(req.body);
        const form = new Regform({
            name, email, gender, age, about
        })
        const saveform = await form.save();
        temp(name, email);
    
        success = true;
      res.json({ success});



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}



module.exports = { reguser };