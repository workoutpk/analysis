var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var autocannon = require('autocannon')
var starsRouter = require('./routes/star');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var visionRouter = require('./routes/vision');
var galaxyRouter = require('./routes/galaxy');
var planetRouter = require('./routes/planet');
var publishRouter = require('./routes/publish');
var compression = require('compression');
var rateLimit = require('express-rate-limit');
var glob = require ("glob");
var options = {
    explorer: true,
    swaggerOptions: {
        urls: [
            {
                url: 'http://petstore.swagger.io/v2/swagger.json',
                name: 'Spec1'
            },
            {
                url: 'http://petstore.swagger.io/v2/swagger.json',
                name: 'Spec2'
            }
        ]
    }
}
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}


var app = express();
// app.use(limiter);
app.use(compression(
    {
        level: 6,
        threshold: 100 * 100,
        filter: shouldCompress,
    }
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/stars', starsRouter);
app.use('/planet', planetRouter);
app.use('/galaxy', galaxyRouter);
app.use('/vision', visionRouter);
app.use('/publish', publishRouter);


// app.use(cors({
//     origin: ['http://localhost:4200'],
//     "methods": "GET,PUT,POST",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204,
//     credentials: true
// }));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use('/', express.static(path.join(__dirname,  'dist','eclyt')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,  'dist', 'eclyt', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
module.exports = app;
