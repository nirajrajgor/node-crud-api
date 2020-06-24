const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV === 'test') {
  console.log("THIS IS TEST SETUP DB")
  const db = mongoose.connect('mongodb://localhost/bookAPI_TEST')
} else {
  const db = mongoose.connect('mongodb://localhost/bookAPI')

}


const port = process.env.PORT || 4000;
const Book = require('./models/bookModel');

const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to nodemon api');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;