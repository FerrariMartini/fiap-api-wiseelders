const express = require('express');
const mongoose = require('mongoose');
const activitiesRoutes = require('./routes/activity');

const connString = 'mongodb://localhost:27017/wiseelders?retryWrites=true';

mongoose
  .connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })
  .then((res) => console.log('MongoDB connected'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/activities', activitiesRoutes);

app.listen(8080);
