/* The DocumentDAO must be constructed with a connected database object */
function DocumentDAO (db, Db, Server) {
	'use strict';

	/* If this constructor is called without the new operator, 'this'
	 * points to the global object. Log a warning and call it correctly. */
	if (false === (this instanceof DocumentDAO)) {
	 	console.log('Warning: DocumentDAO constructor called without "new" operator');
	 	return new DocumentDAO(db, Db, Server);
	}

	this.getDocuments = function (dbName, collectionName, spec, callback) {
	 	var currentDb = new Db(dbName, new Server('localhost', 27017));

	 	// Establish a connection to currentDb
	 	currentDb.open(function (err, db) {
            if (err) return callback(err, null);

            console.log('Connected to database ' + dbName);

            var collection = db.collection(collectionName);
            
            if (spec._id) {
                collection.findOne(spec, function (err, doc) {
                	if (err) return callback(err, null);

                	callback(err, doc);
                	db.close();
                });
            } else {
                collection.find(spec, function (err, cursor) {
                	cursor.toArray(function (err, docs) {
                		if (err) return callback(err, null);

                		callback(err, docs);
                		db.close();
                	});
                });
            }

	 	});
	};

    this.insertDocuments = function (dbName, collectionName, data, callback) {
        var currentDb = new Db(dbName, new Server('localhost', 27017));

        // Establish a connection to currentDb
        currentDb.open(function (err, db) {
            if (err) return callback(err, null);

            console.log('Connected to database ' + dbName);

            var collection = db.collection(collectionName);
            collection.insert(data, {safe:true}, function (err, docs) {
                if (err) return callback(err, null);

                console.log('Document added as ' + docs[0]._id);

                collection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, docs) {
                        if (err) return callback(err, null);

                        callback(err, docs);
                        db.close();
                    });
                });
            });
        });
    };

    this.updateDocuments = function (dbName, collectionName, spec, data, callback) {
        var currentDb = new Db(dbName, new Server('localhost', 27017));

        // Establish a connection to currentDb
        currentDb.open(function (err, db) {
            if (err) return callback(err, null);

            console.log('Connected to database ' + dbName);

            var collection = db.collection(collectionName);

            if (spec._id) {
                collection.update(spec, data, {safe:true}, function (err, doc) {
                    if (err) return callback(err, null);

                    console.log('Document ' + docs[0]._id + ' updated');

                    collection.find({}, function (err, cursor) {
                        cursor.toArray(function (err, docs) {
                            if (err) return callback(err, null);

                            callback(err, docs);
                            db.close();
                        });
                    });
                });
            } else {
                collection.update(spec, data, {safe:true}, function (err, doc) {
                    if (err) return callback(err, null);

                    console.log('Documents updated');

                    collection.find({}, function (err, cursor) {
                        cursor.toArray(function (err, docs) {
                            if (err) return callback(err, null);

                            callback(err, docs);
                            db.close();
                        });
                    });
                });
            }
        });
    };

    this.deleteDocuments = function (dbName, collectionName, spec, callback) {
        var currentDb = new Db(dbName, new Server('localhost', 27017));

        // Establish a connection to currentDb
        currentDb.open(function (err, db) {
            if (err) return callback(err, null);

            console.log('Connected to database ' + dbName);

            var collection = db.collection(collectionName);
            
            collection.remove(spec, function (err, doc) {
                if (err) return callback(err, null);

                console.log('Documents deleted');

                collection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, docs) {
                        if (err) return callback(err, null);

                        callback(err, docs);
                        db.close();
                    });
                });

            });

        });
    };

}

module.exports.DocumentDAO = DocumentDAO;
