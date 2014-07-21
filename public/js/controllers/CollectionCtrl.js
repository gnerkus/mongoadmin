angular.module('CollectionCtrl', []).controller('CollectionController', function ($scope, $route, Document) {

	$scope.tagline = 'Hello, collections!';

	$scope.databaseName = $route.current.params.db_id;
	$scope.collectionName = $route.current.params.coll_id;
	$scope.collectionName = $scope.collectionName.substring($scope.collectionName.indexOf('.') + 1);

	// $scope.formData takes the form of {"collectionName":"test_coll"}
	$scope.queryForm = {
		firstKey: "",
		firstValue: "",
		secondKey: "",
		secondValue: "",
		thirdKey: "",
		thirdValue: ""
	};

	var q = {};

	if ($scope.queryForm.firstKey && $scope.queryForm.firstValue) {
		q[$scope.queryForm.firstKey] = $scope.queryForm.firstValue;
	}

	if ($scope.queryForm.secondKey && $scope.queryForm.secondValue) {
		q[$scope.queryForm.secondKey] = $scope.queryForm.secondValue;
	}

	if ($scope.queryForm.thirdKey && $scope.queryForm.thirdValue) {
		q[$scope.queryForm.thirdKey] = $scope.queryForm.thirdValue;
	}

	$scope.query = {query: q};

	// when landing on the page, get all databases and show them
	Document.get($scope.databaseName, $scope.collectionName, $scope.query)
	    .success(function (data) {
	    	$scope.documents = data;
	    });
});