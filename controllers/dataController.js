const axios = require('axios');
const asyncHandler = require('express-async-handler');
const Location = require('../models/locationmodel'); 

const createLocation = asyncHandler(async(req, res) => {
    const loc=req.body.loc;
    const category=req.body.category;

    if(!loc){
        return res.status(400).json({message: 'Please enter your location'});
    }
    if(!category){
        return res.status(400).json({message: 'Please enter the category'});
    }
    try {
        const result = await axios.post('http://127.0.0.1:5000/api/ngindex', {
            "loc": loc
        });
        if (result.status === 200) {

            const location= new Location({
                name: loc,
                category: category
        });
        try {
            const savedLocation = await location.save();
            console.log('Location saved:', savedLocation);
        } catch (error) {
            console.error('Error saving location:', error);
        }

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
        const payload = {
            "loc" : loc
        };
        const result = await axios.delete('http://127.0.0.1:5000/api/ngindex', {
            data : payload
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
        const result = await axios.put('http://127.0.0.1:5000/api/ngindex', {
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