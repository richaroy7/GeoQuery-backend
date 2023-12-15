const express= require('express');
const { createLocation, deleteLocation, updateLocation } = require('../controllers/dataController');
const router=express.Router();
const validate = require('../middleware/validationHandler');
const adminValidation = require("../middleware/adminValidation");

router.use(validate);
router.use(adminValidation);

router.route('/').post(createLocation).delete(deleteLocation).put(updateLocation);

module.exports=router;