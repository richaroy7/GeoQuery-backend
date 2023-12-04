const express=require('express');
const { getQueries, createQuery, updateQuery, deleteQuery, getQuery} = require('../controllers/querycontroller');
const router=express.Router();


router.route('/').get(getQueries).post(createQuery);
router.route('/:id').get(getQuery).put(updateQuery).delete(deleteQuery);

module.exports=router;