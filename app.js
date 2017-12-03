const express = require('express');

const app = express();

const registerController = require('./controllers/register.js');

const loginController = require('./controllers/login.js');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const server = app.listen(3001, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//registerController.register();


// const db_accessor = require('./controllers/db_accessor.js');

// const delete_query = {
// 	text: 'delete from users where username = $1',
// 	values: ['Alice']
// }
// db_accessor._delete(delete_query);

// const select_query = {
// 	text: 'select * from users'
// }
// db_accessor._select(select_query, res => {
// 	console.log(res);
// })


loginController.login();