const express = require('express');
const router = express.Router();
const JoinForm = require("../models/JoinForm");

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const temp = async (name, email) => {
    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'aubrey.nitzsche@ethereal.email',
            pass: 'eGqVDhafqyvnYZgpHP'
            //pass: 'opwkndyvjzvwadhc'
        }
    }));

    var mailOptions = {
        from: 'Shashank',
        to: email,
        subject: "Sankatmochak",
        html: `Hello <b>${name}</b>, <br>Thank you for registering on <b>SankatMochak</b>`
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
    try {
        const { name, email, gender, age, about } = req.body;
        console.log(req.body);
        const form = new JoinForm({
            name, email, gender, age, about
        })
        const saveform = await form.save();
        temp(name, email);
        res.json(saveform);

    } catch (error) {
        console.log(error);
    }
}



module.exports = { reguser };