var DatabaseDAO = require('../models/databases').DatabaseDAO;
var CollectionDAO = require('../models/collections').CollectionDAO;
var DocumentDAO = require('../models/documents').DocumentDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db, Db, Server) {
	"use strict";

	var databases = new DatabaseDAO(db, Db, Server);
	var collections = new CollectionDAO(db, Db, Server);
	var documents = new DocumentDAO(db, Db, Server);

	this.displayMainPage = function (req, res, next) {
		databases.getDatabases(function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};

	this.handleNewDatabase = function (req, res, next) {
		var dbName = req.body.dbName;
        var collectionName = 'test';

        databases.createDatabase(dbName, collectionName, function (err, results) {
        	if (err) return next(err);

        	res.json(results);
        });
	};

	this.dropDatabase = function (req, res, next) {
		var dbName = req.params.db_id;

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
		var collectionName = req.params.coll_id;

		collections.dropCollection(dbName, collectionName, function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};

	this.getDocuments = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.params.coll_id;

        var spec = req.query.query? JSON.parse(req.query.query) : {};
            spec = req.query.spec? JSON.parse(req.query.spec) : spec;

        documents.getDocuments(dbName, collectionName, spec, function (err, results) {
        	if (err) return next(err);

        	res.json(results);
        });
	};

	this.handleNewDocument = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.params.coll_id;

        var newDocument = req.body;

        documents.insertDocuments(dbName, collectionName, newDocument, function (err, results) {
            if (err) return next(err);

            res.json(results);
        });
	};

	this.updateDocuments = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.params.coll_id;

		var spec = req.query.query? JSON.parse(req.query.query) : {};
		    spec = req.query.spec? JSON.parse(req.query.spec) : spec;

		var newDocument = req.body;

		documents.updateDocuments(dbName, collectionName, spec, newDocument, function (err, results) {
			if (err) return next(err);

			res.json(results);
		});
	};

	this.deleteDocuments = function (req, res, next) {
		var dbName = req.params.db_id;
		var collectionName = req.params.coll_id;

        var spec = req.query.query? JSON.parse(req.query.query) : {};
            spec = req.query.spec? JSON.parse(req.query.spec) : spec;

        documents.deleteDocuments(dbName, collectionName, spec, function (err, results) {
        	if (err) return next(err);

        	res.json(results);
        });
	};
}

module.exports = ContentHandler;