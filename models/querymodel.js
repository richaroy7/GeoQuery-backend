const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
    query: {
        type: String,
        required:[true, 'Please enter your query']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Query', querySchema);