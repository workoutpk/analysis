
var app = require('../app');
var debug = require('debug')('analysis:server');
var http = require('http');
var cluster = require('cluster');
var os = require('os');
var numCPUs = require('os').cpus().length;
var { mongoose } = require('../config/db.connection');
//DB Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb'));

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */




db.once('open', () => 
{
   
    if(cluster.isMaster){
        for (let i = 0; i < 1e8; i++) {
            //some long runnning task;
        }
        console.log(`Cluster Master ${process.pid} is running now ...`);
    
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
    }else{
        app.listen(3001, () => {
        
            console.log(`Eclyt DB connected, thread  started with port/id : 3001/${process.pid} `)
        });
    }
}


);
