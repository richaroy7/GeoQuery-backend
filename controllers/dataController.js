const axios = require('axios');
const asyncHandler = require('express-async-handler');

const createLocation = asyncHandler(async(req, res) => {
    const loc=req.body.loc;

    if(!loc){
        return res.status(400).json({message: 'Please enter your location'});
    }
    try {
        const result = await axios.post('http://localhost:8000/api/ngindex', {
            "loc": loc
        });
        if (result.status === 200) {
            res.status(201).json({
                response: result.data
            });
        }
        else {
            res.status(400).json({message: 'Error processing location'});
        }
    } catch (error) {
        console.error('Error processing location', error);
        throw error;
    }
});

const deleteLocation = asyncHandler(async(req, res) => {
    const loc=req.body.loc;

    if(!loc){
        return res.status(400).json({message: 'Please enter your location'});
    }
    try {
        const result = await axios.delete('http://localhost:8000/api/ngindex', {
            "loc": loc
        });
        if (result.status === 200) {
            res.status(201).json({
                response: result.data
            });
        }
        else {
            res.status(400).json({message: 'Error deleting location'});
        }
    } catch (error) {
        console.error('Error deleting location', error);
        throw error;
    }
});

const updateLocation = asyncHandler(async(req, res) => {
    const old_loc=req.body.old_loc;
    const new_loc=req.body.new_loc;

    if(!old_loc || !new_loc){
        return res.status(400).json({message: 'Please enter both old and new location'});
    }
    try {
        const result = await axios.put('http://localhost:8000/api/ngindex', {
            "old_loc": old_loc,
            "new_loc": new_loc
        });
        if (result.status === 200) {
            res.status(201).json({
                response: result.data
            });
        }
        else {
            res.status(400).json({message: 'Error updating location'});
        }
    } catch (error) {
        console.error('Error updating location', error);
        throw error;
    }       
});


module.exports = {createLocation, deleteLocation, updateLocation};