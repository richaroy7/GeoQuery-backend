const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;