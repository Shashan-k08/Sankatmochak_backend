const router = require('express').Router();
const {mail}=require('../controllers/mail');
router.post('/sendmail',mail)

 
module.exports=router;