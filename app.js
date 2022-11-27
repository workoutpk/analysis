var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');

var starsRouter     = require('./routes/star');
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var visionRouter    = require('./routes/vision');
var galaxyRouter    = require('./routes/galaxy');
var planetRouter    = require('./routes/planet');
var publishRouter   = require('./routes/publish');
var compression     = require('compression')

var app = express();
app.use(compression(
    { 
        level:6,
        threshold:100*100,
        filter: shouldCompress,
    }
));
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }  
    // fallback to standard filter function
    return compression.filter(req, res)
}




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stars', starsRouter);
app.use('/planet', planetRouter);
app.use('/galaxy', galaxyRouter);
app.use('/vision', visionRouter);
app.use('/publish', publishRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
