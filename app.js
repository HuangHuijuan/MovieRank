const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('client-sessions');
const app = express();
const routes = require('./controllers/routes.js');
const searchController = require('./controllers/search.js');
const rankController = require('./controllers/rank.js');
const recommand = require('./controllers/recommand.js');
const userModel = require('./models/user.js');

//Here we are configuring express to use body-parser as middle-ware.
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// add session handler middleware
app.use(session({
  cookieName: 'session',
  secret: 'movierank',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.post('/recommand', function (req, res) {
  var param = req.body.userid;
  console.log(param);
  recommand._credence_recommand(param, (result) => res.json(result));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server listening at port", port);
});


// registerController.register();


// const db_accessor = require('./models/db_accessor.js');

// // const delete_query = {
// // 	text: 'delete from users where username = $1',
// // 	values: ['Alice']
// // }
// // db_accessor._delete(delete_query);

// const select_query = {

// 	text: 'select * from users limit 10'
// }
// db_accessor._select(select_query, res => {
// 	console.log(res);
//   text: 'select * from users'
// }
// db_accessor._select(select_query, res => {
//   console.log(res);
// })

// const userid = 2;

// recommand._credence_recommand(userid, (result) => console.log(result));

// loginController.login();

