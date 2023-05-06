const router = require('express').Router();
const {volregform}=require('../controllers/regForm');
router.route('/volregform')
.post(volregform)
module.exports=router;