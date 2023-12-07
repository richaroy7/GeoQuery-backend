const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validate= asyncHandler(async(req,res,next)=>{
  const authHeader=req.headers.Authorization||req.headers.authorization;
  if(!authHeader)
  {
      res.status(401);
      throw new Error("Not authorized, no token");
  }
  let token;
  
  if(authHeader && authHeader.startsWith("Bearer"))
  {
        token= authHeader.split(" ")[1];

        if(!token)
        {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
         jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error("Not authorized, wrong token");
            }
            else
            {
               console.log(decoded);
               req.user=decoded.user;
               next();

            }
        });

       
  }
  

});

module.exports=validate;