const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogController');
const middleware = require('./utils/middleware');

const init = async () => {
  const URL = config.MONGO_URI;
  try {
    await mongoose.connect(URL);
    console.log('connected to mongoDB');
  } catch (err) {
    console.log('error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

init();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(
  middleware.morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
