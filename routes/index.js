var ContentHandler = require('./content');

module.exports = exports = function (router, db, Db, Server) {
	"use strict";

    var contentHandler = new ContentHandler(db, Db, Server);
    
    router.route('/')

        // get all the databases
        .get(contentHandler.displayMainPage)

        // create a database
        .post(contentHandler.handleNewDatabase);

    router.route('/:db_id')

        // get all collections in the db_id database
        .get(contentHandler.getCollections)

        // create a collection in the db_id database
        .post(contentHandler.handleNewCollection)

        // drop the db_id database
        .delete(contentHandler.dropDatabase);

    router.route('/:db_id/:coll_id')

        // create a new document in the coll_id collection
        .post(contentHandler.handleNewDocument)

        // drop the coll_id collection
        .delete(contentHandler.dropCollection);

    router.route('/:db_id/:coll_id/?')

        // get all the documents in the coll_id collection
        .get(contentHandler.getDocuments)

        // update documents in the coll_id collection
        .put(contentHandler.updateDocuments)

        // delete documents in the coll_id collection
        .delete(contentHandler.deleteDocuments);

    router.route('/:db_id/:coll_id/remove?')

        // delete documents in the coll_id collection
        .delete(contentHandler.deleteDocuments);

};