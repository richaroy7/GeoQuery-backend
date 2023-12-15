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

app.use(cors());

app.use('/api/queries', require('./routes/queryRoute'));
app.use('/api/data', require('./routes/dataRoute'));

app.use('/api/users',require('./routes/userRoute'));
app.use(
    '/api/processquery',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '/api/processquery': 'http://127.0.0.1:5000/api/processquery',
      },
    }),
);



app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});