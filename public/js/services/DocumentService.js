angular.module('DocumentService', []).factory('Document', ['$http', function ($http) {

	return {
		// call to get all databases
		get : function (databaseName, collectionName, query) {
			// query is of the form {query: {"name": "dude"}}
			return $http.get('/admin/' + databaseName + '/' + collectionName, {params: query});
		},

		// call to POST and create a new database
		create: function (databaseName, collectionName, documentData) {
			return $http.post('/admin/' + databaseName + '/' + collectionName, documentData);
		},

		// call to PUT and update a document
		put: function (databaseName, collectionName, documentData, query) {
			return $http.post('/admin/' + databaseName + '/' + collectionName, documentData, {params: query});
		},

		// call to DELETE a database
		delete: function (databaseName, collectionName, query) {
			return $http.delete('/admin/' + databaseName + '/' + collectionName + '/remove', {params: query});
		}
	};
}]);