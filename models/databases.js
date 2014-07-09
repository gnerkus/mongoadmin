/* The DatabaseDAO must be constructed with a connected database object */
function DatabaseDAO (db, Db, Server) {
	"use strict";

    /* if this constructor is called without the "new" operator, "this"
	 * points to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof DatabaseDAO)) {
        console.log('Warning: DatabaseDAO constructor called without "new" operator');
        return new DatabaseDAO(db);
	}

	var adminDb = db.admin();

	this.getDatabases = function (callback) {
        adminDb.listDatabases(function (err, dbs) {
        	if (err) return callback(err, null);

        	console.log("Found " + dbs.databases.length + " databases");

        	callback(err, dbs.databases);
        });
	};

	this.createDatabase = function (dbName, collectionName, callback) {
        var newDb = new Db(dbName, new Server('localhost', 27017));
        
        // Establish a connection to newDb
        newDb.open(function (err, db) {
        	if (err) return callback(err, null);

        	console.log("Created new database " + dbName);
            // Grab a collection object
            var collection = db.collection(collectionName);

            // Force the creation of the collection by inserting a document
            // Collections are not created until the first document is inserted
            collection.insert({'a': 1}, {w: 1}, function (err, doc) {
            	if (err) return callback(err, null);

            	console.log("Inserted " + collectionName + " collection into " +dbName);
                db.close();

                adminDb.listDatabases(function (err, dbs) {
        	        if (err) return callback(err, null);

        	        console.log("Found " + dbs.databases.length + " databases");

        	        callback(err, dbs.databases);
                });
            });
        });
	};

	this.dropDatabase = function (dbName, callback) {
		var currentDb = new Db(dbName, new Server('localhost', 27017));

		// Establish a connection to currentDb
		currentDb.open(function (err, db) {
			if (err) return callback(err, null);
			
			console.log('Connected to database ' + dbName);

			// Drop the database
			db.dropDatabase();

			adminDb.listDatabases(function (err, dbs) {
        	    if (err) return callback(err, null);

        	    console.log("Found " + dbs.databases.length + " databases");

        	    callback(err, dbs.databases);
            });
		});
	};
}

module.exports.DatabaseDAO = DatabaseDAO;