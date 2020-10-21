const express = require('express');
const morgan = require('morgan');


const games = require('./games.js')

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  let data = [...games];

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
    data = data.sort((a, b) =>
      typeof a[sort] === 'string'
        ? a[sort].toLowerCase() > b[sort].toLowerCase()
          ? 1
          : a[sort].toLowerCase() < b[sort].toLowerCase()
            ? -1
            : 0

        : a[sort] < b[sort]
          ? 1
          : a[sort] > b[sort]
            ? -1
            : 0

    )
  }

  res.json(data);

})

module.exports = app



