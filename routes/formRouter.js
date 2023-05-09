const router = require('express').Router();
const {reguser}=require('../controllers/regForm');
router.post('/reguser',reguser)

 
module.exports=router;