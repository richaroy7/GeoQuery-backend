const {constants}=require('../constants');

const errorHandler = (err,req,res,next) =>{
    const statCode=res.statusCode ? res.statusCode : 500;//if res.statusCode exists then assign it to statusCode else assign 500
    //statusCode is a keyword in HTTP response that tells us the status of the response
    switch(statCode){
    case constants.NOT_FOUND:
    res.json({title:"Not Found",message: err.message, stackTrace: err.stack});
    break;
    case constants.VALIDATION_ERROR:
    res.json({title:"Validation Failed",message: err.message, stackTrace: err.stack});
    break;
    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized",message: err.message, stackTrace: err.stack});
        break;
    case constants.FORBIDDEN:
        res.json({title:"Forbidden",message: err.message, stackTrace: err.stack});
        break;
    case constants.INTERNAL_SERVER_ERROR:
        res.json({title:"Internal Server Error",message: err.message, stackTrace: err.stack});
        break;
    default:
        console.log("No error found")
        break;
    }
    
    //now instead of sending the error message in HTML we are sending it in JSON
};
module.exports = errorHandler;