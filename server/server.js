const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/userRoute');

//Port to listen on
const PORT = process.env.PORT || 3000;

//Enable CORS
app.use(cors());

//Import Routes
// const authRoute = require('./routes/auth');
// const postRoute = require('./routes/post');

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('connected')
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

//Route Middlewares
app.use('/user', users);
// app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`server up and running on ${PORT} `));
