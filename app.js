const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('./libs/log')(module);

/**
 * MongoDB
 * */
// const mongodb = require("createDB");
// const mogoose = require('createDbMongoose');

// const mongoose = require('./createDbWeb-shop');

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const aboutRouter = require('./routes/about');
const scheldulRouter = require('./routes/schedule');

const app = express();

// view engine setup
const handlebars = require('express-handlebars').create(
	{
		layoutsDir: 'template/layouts',
		partialsDir: 'template/partials',
		defaultLayout: 'main'
	});
app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'handlebars');

if ( app.get('env') === 'development') {
	app.use(morgan('combined', {stream: winston.stream})); // dev
} else {
	app.use(morgan('default'));
}
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/about', aboutRouter);
app.use('/schedule', scheldulRouter);

app.use('/form-handler', bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
// closed page
app.use(function (req, res, next) {
	if (req.url === '/forbidden') {
		next(new Error('oops, this\'s page will be closed for you'));
  }
  else if (req.url === '/stop'){
		winston.info('stop');
		res.render('stop', {layout: "exception"});
	} else {
    next();
  }
});

app.use(function(req, res) {
	// if (res.statusCode === 404) {
		winston.error("404 - запрос не существующей сраницы (" + req.url + ")");
		res.render('404', {layout: 'exception', body: res.stack});
	// }
});


// error handler 500
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	// console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // res.send(500);

	// add this line to include winston logging

	winston.error(`${req.ip} / ${req.method} / ${err.status || 500} - ${err.message} := ${req.originalUrl}`);

  // render the error page
  res.status(err.status || 500);
  res.render('500', {layout: 'exception', body: err.stack});
});

module.exports = app;
