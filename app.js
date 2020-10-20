const express = require('express');
const morgan = require('morgan');


const server = require('./server.js')

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  let data = [...server];

  const { Genre, sort } = req.query
  // actually reference the search name, not just a variable name
  if (Genre && Genre === "" && Genre === undefined) {
    return res
      .status(400)
      .json({ message: "NO" });
  }

  if (Genre) {
    data = data.filter(obj => obj.Genres.toLowerCase().includes(Genre.toLowerCase()))
  }

  if (sort && sort !== 'App' && sort !== 'Rating') {
    return res
      .status(400)
      .json({ message: 'AGAIN, NO' })
  }

  if (sort) {
    data = data.sort((a, b) => {
      a[sort] - b[sort]
    });
  }

  res.json(data);

})

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});



