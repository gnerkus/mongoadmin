var DatabaseDAO = require('../models/databases').DatabaseDAO;
var CollectionDAO = require('../models/collections').CollectionDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db, Db, Server) {
	"use strict";

	var databases = new DatabaseDAO(db, Db, Server);
	var collections = new CollectionDAO(db, Db, Server);

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

	this.getCollections = function (req, res, next) {
		var dbName = req.params.db_id;

        collections.getCollections(dbName, function (err, results) {
        	if (err) return next(err);

        	res.json(results);
        });
	};

	this.handleNewCollection = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.body.collectionName;

		collections.createCollection(dbName, collectionName, function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};

	this.dropCollection = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.body.collectionName;

		collections.dropCollection(dbName, collectionName, function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};
}

module.exports = ContentHandler;