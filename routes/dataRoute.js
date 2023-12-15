const express= require('express');
const { createLocation, deleteLocation, updateLocation } = require('../controllers/dataController');

const router=express.Router();

router.route('/').post(createLocation).delete(deleteLocation).put(updateLocation);

module.exports=router;