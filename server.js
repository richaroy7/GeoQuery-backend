const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const expressAsyncHandler = require('express-async-handler');
dotenv.config();

//herewegoagain123

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/queries', require('./routes/queryRoute'));

app.use('/api/users',require('./routes/userRoute'));

app.use(errorHandler);


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});