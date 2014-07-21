/* The CollectionDAO must be constructed with a connected database object */
function CollectionDAO (db, Db, Server) {
    "use strict";

    /* if this constructor is called without the "new" operator, "this"
	 * points to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof CollectionDAO)) {
        console.log('Warning: CollectionDAO constructor called without "new" operator');
        return new CollectionDAO(db, Db, Server);
	}

	this.getCollections = function (dbName, callback) {
        var currentDb = new Db(dbName, new Server('localhost', 27017));

        // Establish a connection to currentDb
        currentDb.open(function (err, db) {
        	if (err) return callback(err, null);

        	console.log('Connected to database ' + dbName);

        	db.collectionNames(function (err, collections) {
        		if (err) return callback(err, null);

        		callback(err, collections);
        		db.close();
        	});
        });
	};

	this.createCollection = function (dbName, collectionName, callback) {
		var currentDb = new Db(dbName, new Server('localhost', 27017));

		// Establish a connection to currentDb
		currentDb.open(function (err, db) {
			if (err) return callback(err, null);

			console.log('Connected to database ' + dbName);

            db.createCollection(collectionName, function (err, collection) {
                collection.insert({'test_obj': 'It works'}, {w: 1}, function (err, result) {
                    console.log('Created collection ' + collectionName);

                    db.collectionNames(function (err, collections) {
                        if (err) return callback(err, null);

                        callback(err, collections);
                        db.close();
                    });
                });
            });

		});
	};

	this.dropCollection = function (dbName, collectionName, callback) {
		var currentDb = new Db(dbName, new Server('localhost', 27017));

		// Establish a connection to currentDb
		currentDb.open(function (err, db) {
			if (err) return callback(err, null);

			console.log('Connected to database ' + dbName);
            db.createCollection(collectionName, function (err, collection) {
                collection.drop(function (err, result) {
                    console.log('Dropped collection ' + collectionName);

                    db.collectionNames(function (err, collections) {
                        if (err) return callback(err, null);

                        callback(err, collections);
                        db.close();
                    });
                });
            });
		});
	};
}

module.exports.CollectionDAO = CollectionDAO; 