const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true  ,limit : '50mb'}));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  
  'Access-Control-Allow-Origin':'',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  withCredentials: true,
};

app.use(cors(corsOptions));


const userRoute =    require('./routes/users');
const postRoute =    require('./routes/posts');
const commentRoute = require('./routes/comments');


app.use('/api/v1' , userRoute);
app.use('/api/v1' , postRoute);
app.use('/api/v1' , commentRoute);

app.use(errorMiddleware);



module.exports = app;