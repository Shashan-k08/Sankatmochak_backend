const router = require('express').Router();
const {signUp,signIn}=require('../controllers/userController');
router.post('/signUp',signUp)
// router.route('/signIn')
// .post(signIn)
module.exports=router;