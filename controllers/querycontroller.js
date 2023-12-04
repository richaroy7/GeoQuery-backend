
const asyncHandler = require('express-async-handler');

const getQueries =asyncHandler(async(req, res) => {
    res.json({message: 'all received queries'});
});

const createQuery =asyncHandler(async(req, res) => {
    console.log(req.body);
    const {email,query}=req.body;

    if(!email || !query){
        return res.status(400).json({message: 'email and query are required'});
    }
    res.json({message: 'creating a query'});
});

const getQuery = asyncHandler(async(req, res) => {
    res.json({message: `getting query with id ${req.params.id}`});
});

const updateQuery =asyncHandler(async(req, res) => {
    res.json({message: `updating query with id ${req.params.id}`});
});

const deleteQuery = asyncHandler(async(req, res) => {
    res.json({message: `deleting query with id ${req.params.id}`});
});

module.exports = {getQueries, createQuery,getQuery, updateQuery, deleteQuery};