var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var monthRouter = require('./routes/month')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', monthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  var errorStatus = (err.status || 500)
  var errorMessage = errorStatus + (errorMessage === 500 ? ": Server Error" : ": " + err.message)
  var titleMessage = errorMessage + "  | whatleavesafter.com";

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: errorMessage,
    pagetitle: errorMessage,
    title: titleMessage,
    status: errorStatus,
    error: req.app.get('env') === 'development' ? err : false
  });
});

module.exports = app;
