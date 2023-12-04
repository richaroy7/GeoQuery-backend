const express=require('express');
const { getQueries, createQuery, updateQuery, delQuery, getQuery} = require('../controllers/querycontroller');
const router=express.Router();
const validate = require('../middleware/validationHandler');

router.use(validate);


router.route('/').get(getQueries).post(createQuery);
router.route('/:id').get(getQuery).put(updateQuery).delete(delQuery);

module.exports=router;