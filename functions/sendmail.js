const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const sendinfo = async (name, email) => {
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
        html: `<b>${name}</b>, <br>A new device login has been detected <br/> Verify if it's you<br/> <br/> <br/><b>Team Sankatmochak </b>`
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
module.exports = { sendinfo };