angular.module('CollectionService', []).factory('Collection', ['$http', function ($http) {

	return {
		// call to get all databases
		get : function (databaseName) {
			return $http.get('/admin/' + databaseName);
		},

		// call to POST and create a new database
		create: function (databaseName, collectionData) {
			return $http.post('/admin/' + databaseName, collectionData);
		},

		// call to DELETE a database
		delete: function (databaseName, collectionName) {
			return $http.delete('/admin/' + databaseName + '/' + collectionName);
		}
	};
}]);