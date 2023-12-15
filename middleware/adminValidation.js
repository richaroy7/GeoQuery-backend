const asyncHandler=require("express-async-handler");

const adminValidation= asyncHandler(async(req,res,next)=>{
    const admin = req.user.admin;
    if(!admin){
        res.status(401);
        throw new Error("Not authorized, Not an admin");
    }else{
        next();
    }
});

module.exports= adminValidation;