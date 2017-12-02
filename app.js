const express = require('express');

const app = express();

const db_accessor = require('./controllers/db_accessor.js');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

const query = {
	text: 'select * from movies;'
}

db_accessor._select(query, (res) => {
	console.log(res);
});
