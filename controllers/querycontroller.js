
const asyncHandler = require('express-async-handler');
const { ObjectId } = require("mongodb");
const Query = require('../models/querymodel');

const getQueries =asyncHandler(async(req, res) => {
    const queries=await Query.find({user_id: req.user.id});
    res.json(queries);
});

const createQuery =asyncHandler(async(req, res) => {
    console.log(req.body);
    const {query}=req.body;

    if(!query){
        return res.status(400).json({message: 'no query entered'});
    }
    console.log('user_id:', req.user._id);
    console.log('query:', query);
    const newQuery = new Query({
        user_id: req.user.id,
        query
    });
    
    try {
        const createdQuery = await newQuery.save();
        res.status(201).json(createdQuery);
    } catch (error) {
        console.error('Error saving query:', error);
        throw error;
    }
    
});

const getQuery = asyncHandler(async(req, res) => {
   const query = await Query.findById(req.params.id);
   if(!query){
       res.status(404).json({message: 'Query not found'});
   }
   if(query){

        if(query.user_id != req.user.id){
            res.status(401).json({message: 'Not authorized to view this query'});
            throw new Error('Not authorized to view this query');
        }
        res.json(query);
    }
});

const updateQuery =asyncHandler(async(req, res) => {
    const query=await Query.findById(req.params.id);
    if(!query)
    {
        res.status(404);
        throw new Error("Query not found");
    }
    if(query.user_id != req.user.id){
        res.status(401).json({message: 'Not authorized to edit this query'});
        throw new Error('Not authorized to edit this query');
    }
    else
    {
        query.query=req.body.query || query.query;
        const updatedQuery=await query.save();
        res.json(updatedQuery);
    
    }
});


const delQuery = asyncHandler(async (req,res)=>{
    
    const query=await Query.findById(req.params.id);
    if(!query)
    {
        res.status(404);
        throw new Error("Query not found");
    }
    if(query.user_id != req.user.id){
        res.status(401).json({message: 'Not authorized to delete this query'});
        throw new Error('Not authorized to delete this query');
    }
    else if(query)
    {
        await query.deleteOne();
        res.json({message:"query removed"});
    }
});

module.exports = {getQueries, createQuery,getQuery, updateQuery, delQuery};