//var ContentHandler = require('./content');

module.exports = exports = function (router, db) {
	"use strict";

	router.get('*', function (req, res) {
		res.sendfile('./public/index.html');
	});

    router.get('/', function (req, res) {
    	var adminDb = db.admin();

    	adminDb.listDatabases(function (err, dbs) {
    		res.json(dbs.databases);
    	});
    });
};