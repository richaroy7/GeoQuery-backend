const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

   
    username:{
        type:String,
        required:[true,'Please enter your username']
    },
    first_name:{
        type:String,
        required:[true,'Please enter your first name']
    },
    last_name:{
        type:String,
        required:[true,'Please enter your last name']
    },
    password:{
        type:String,
        required:[true,'Please enter your password']
    },
    admin:{
        type:Boolean,
        default : false
    },
    }
    ,{
        timestamps:true
    }
);

module.exports = mongoose.model('Users',userSchema);