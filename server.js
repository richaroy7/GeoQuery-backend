const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const expressAsyncHandler = require('express-async-handler');
const { connect } = require('mongoose');
const connectDB = require('./config/dbConnection');
dotenv.config();
const morgan = require('morgan');

//herewegoagain123

connectDB();

const app = express();

const port = process.env.PORT || 6900;

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/queries', require('./routes/queryRoute'));

app.use('/api/users',require('./routes/userRoute'));

app.use(errorHandler);


app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});