angular.module('DatabaseCtrl', []).controller('DatabaseController', function ($scope, $route, Collection) {

	$scope.tagline = 'Hello, Angular!';

	$scope.databaseName = $route.current.params.db_id;

	// $scope.formData takes the form of {"collectionName":"test_coll"}
	$scope.formData = {collectionName: ""};

	// when landing on the page, get all databases and show them
	Collection.get($scope.databaseName)
	    .success(function (data) {
	    	$scope.collections = data;
	    });
	
    // When submitting the new database form, send the text to the API
	$scope.createCollection = function () {
		if (!$.isEmptyObject($scope.formData)) {
			Collection.create($scope.databaseName, $scope.formData)
                .success(function (data) {
                	$scope.formData = {};
                	$scope.collections = data;
                });
		}
        
	};

	// Delete a database
	$scope.deleteCollection = function () {
        Collection.delete($scope.databaseName, $scope.formData.collectionName)
            .success(function (data) {
            	$scope.formData = {};
            	$scope.collections = data;
            });
	};
});