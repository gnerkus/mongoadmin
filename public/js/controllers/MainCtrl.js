angular.module('MainCtrl', []).controller('MainController', function ($scope, $http, Database) {

	$scope.tagline = 'mongoadmin';

	// $scope.formData takes the form of {"dbName":"test_db"}
	$scope.formData = {dbName: ""};

	// when landing on the page, get all databases and show them
	Database.get()
	    .success(function (data) {
	    	$scope.databases = data;
	    });
	
    // When submitting the new database form, send the text to the API
	$scope.createDatabase = function () {
		if (!$.isEmptyObject($scope.formData)) {
			Database.create($scope.formData)
                .success(function (data) {
                	$scope.formData = {};
                	$scope.databases = data;
                });
		}
        
	};

	// Delete a database
	$scope.deleteDatabase = function () {
        Database.delete($scope.formData.dbName)
            .success(function (data) {
            	$scope.formData = {};
            	$scope.databases = data;
            });
	};
});