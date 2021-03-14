const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

//Port to listen on
const PORT = process.env.PORT || 5000;

//Enable CORS
app.use(cors());

//Import Routes
const auth = require('./routes/authRoute');
const users = require('./routes/userRoute');
const posts = require('./routes/postRoute');

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => console.log('connected to database')
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

//Route Middlewares
app.use('/', users);
app.use('/', posts);
app.use('/', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => console.log(`server up and running on ${PORT} `));
