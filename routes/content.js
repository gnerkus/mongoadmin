var DatabaseDAO = require('../models/databases').DatabaseDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db, Db, Server) {
	"use strict";

	var databases = new DatabaseDAO(db, Db, Server);

	this.displayMainPage = function (req, res, next) {
		databases.getDatabases(function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};

	this.handleNewDatabase = function (req, res, next) {
		var dbName = req.body.dbName;
        var collectionName = req.body.collectionName;

        databases.createDatabase(dbName, collectionName, function (err, results) {
        	if (err) return next(err);

        	res.json(results);
        });
	};

	this.dropDatabase = function (req, res, next) {
		var dbName = req.body.dbName;

		databases.dropDatabase(dbName, function (err, results) {
			if (err) return callback(err, null);

			res.json(results);
		});
	};
}

module.exports = ContentHandler;