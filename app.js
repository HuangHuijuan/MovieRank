const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();
const indexController = require('./controllers/index.js');
const rankController = require('./controllers/rank.js');
const registerController = require('./controllers/register.js');
const loginController = require('./controllers/login.js');
const searchController = require('./controllers/search.js');
const recommand = require('./controllers/recommand.js');

//Here we are configuring express to use body-parser as middle-ware.
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', indexController);
//app.get('/rank', rankController);

app.post('/recommand', function(req, res){
  var param = req.body.userid;
  console.log(param);
  recommand._credence_recommand(param, (result) => res.json(result));
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

const userid = 2;

recommand._credence_recommand(userid, (result) => console.log(result));


