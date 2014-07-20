var ContentHandler = require('./content');

module.exports = exports = function (router, db, Db, Server) {
	"use strict";

    var contentHandler = new ContentHandler(db, Db, Server);
    
    router.route('/')

        // get all the databases
        .get(contentHandler.displayMainPage)

        // create a database
        .post(contentHandler.handleNewDatabase)

        // drop a database
        .delete(contentHandler.dropDatabase);

    router.route('/:db_id')

        // get all collections in database with id db_id
        .get(contentHandler.getCollections)

        // create a collection in database db_id
        .post(contentHandler.handleNewCollection)

        // drop a collection from database db_id
        .delete(contentHandler.dropCollection);

    router.route('/:db_id/:coll_id/?')

        // get all documents in collection coll_id
        .get(contentHandler.getDocuments)

        // update a document
        .put(contentHandler.updateDocuments)

        // delete a document
        .delete(contentHandler.deleteDocuments);

    router.route('/:db_id/:coll_id/')

        // create a document in collection coll_id
        .post(contentHandler.handleNewDocument);

};