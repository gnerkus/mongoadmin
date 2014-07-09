// BASE SETUP
// ===================================================

// call the packages we need
var express     = require('express'), // web framework to handle routing requests
    app         = express(),
    morgan      = require('morgan'),
    mongodb     = require('mongodb'), // driver for connecting to MongoDB
    bodyParser  = require('body-parser'),
    Db          = mongodb.Db,
    MongoClient = mongodb.MongoClient,
    Server      = mongodb.Server,
    router      = express.Router(),
    routes      = require('./routes'),
    port        = process.env.PORT || 8082;

var db = new Db('administrator', new Server('localhost', 27017));

// Establish connection to db
db.open(function (err, db) {
    "use strict";
    if (err) throw err;

    app.use(morgan('dev'));
    app.use(express.static(__dirname + '/public'));

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(bodyParser.urlencoded({
    	extended: true
    }));

    app.use(bodyParser.json());
    app.use('/admin', router);

    routes(router, db, Db, Server);

    app.listen(port);
    console.log('Express server listening on port 8082');
});