const express = require("express");
const router=express.Router();
const {registerUser, loginUser,currentUser} = require('../controllers/userController');
const validate = require('../middleware/validationHandler');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/currentuser').get(validate,currentUser);

module.exports=router;