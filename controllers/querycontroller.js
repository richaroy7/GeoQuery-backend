const axios = require('axios');
const asyncHandler = require('express-async-handler');
const Query = require('../models/querymodel');
const Location = require('../models/locationmodel'); 

const getQueries =asyncHandler(async(req, res) => {
    const queries=await Query.find({user_id: req.user.id});
    res.json(queries);
});

const createQuery =asyncHandler(async(req, res) => {
    // console.log(req.body);
    const query=req.body.query;
    const user_id=req.user.id;
    //console.log(user_id);
    if(!query || !user_id){
        return res.status(400).json({message: 'Please enter your query'});
    }
    try {
        const newQuery = new Query({
            user_id: user_id,
            query: query
        });    
        //enter flask url in next line
        const result = await axios.post('http://127.0.0.1:5000/api/processquery', {
            "query": query
        });
        if (result.status === 200) 
        {
            const q = await newQuery.save();

            let fuzzy = result.data.fuzzy_matches_1;
            let tokens = result.data.model_1_loc;
            
            for(let i=0;i<tokens.length;i++){
                for(let j=0;j<fuzzy[tokens[i][0]].length;j++){
                    
                    let cat = await Location.findOne({name : fuzzy[tokens[i][0]][j][0].toString().replace(/\s/g, '').toLowerCase()});

                    if(cat)
                    fuzzy[tokens[i][0]][j].push(cat.category)

                }
            }

            fuzzy = result.data.fuzzy_matches_2;
            tokens = result.data.model_2_loc;
            
            for(let i=0;i<tokens.length;i++){
                for(let j=0;j<fuzzy[tokens[i][0]].length;j++){
                    
                    let cat = await Location.findOne({name : fuzzy[tokens[i][0]][j][0].toString().replace(/\s/g, '').toLowerCase()});

                    if(cat)
                    fuzzy[tokens[i][0]][j].push(cat.category)

                }
            }

            res.status(201).json({
                query: q,
                response: result.data
            });
        }
        else 
        {
            res.status(400).json({message: 'Error processing query'});
        }
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