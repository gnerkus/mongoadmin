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
};