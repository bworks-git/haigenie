var express = require('express');
var compress = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var  jumanji = require('jumanji');


var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var product = require('./routes/product');
var nutrifact = require('./routes/nutrifact');
var order = require('./routes/order');
var admin = require('./routes/admin');
var promotion = require('./routes/promotion');
var wishlist = require('./routes/wishlist');
var review = require('./routes/review');

var app = express();
app.use(compress());
app.set('etag', false);

app.use(jumanji);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', function(req, res, next){ 
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use('/api/user', users);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/nutrifact', nutrifact);
app.use('/api/order', order);
app.use('/admin', admin);
app.use('/', routes);
app.use('/api/promotion', promotion);
app.use('/api/wishlist', wishlist);
app.use('/api/review', review);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public'), {
        etag: false
}));

mongoose.connect(config.db,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Connected to mongodb');
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
