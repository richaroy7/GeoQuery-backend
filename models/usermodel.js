const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

   
    username:{
        type:String,
        required:[true,'Please enter your username']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique: [true, 'Email already exists'] 
    },
    password:{
        type:String,
        required:[true,'Please enter your password']
    },
    }
    ,{
        timestamps:true
    }
);

module.exports = mongoose.model('Users',userSchema);