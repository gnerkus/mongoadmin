angular.module('DatabaseService', []).factory('Database', ['$http', function ($http) {

	return {
		// call to get all databases
		get : function () {
			return $http.get('/admin');
		},

		// call to POST and create a new database
		create: function (databaseData) {
			return $http.post('/admin', databaseData);
		},

		// call to DELETE a database
		delete: function (databaseName) {
			return $http.delete('/admin/' + databaseName);
		}
	};
}]);