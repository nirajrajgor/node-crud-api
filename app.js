const express = require('express');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 4000;

bookRouter.route('/books')
  .get((req, res) => {
    const response = { data: 'This is api res' };
    res.json(response);
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to nodemon api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
