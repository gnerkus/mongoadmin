angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider

	    // home page
	    .when('/', {
	    	templateUrl: 'views/home.html',
	    	controller: 'MainController'
	    })

	    // databases page
	    .when('/:db_id', {
	    	templateUrl: 'views/databases.html',
	    	controller: 'DatabaseController'
	    })

	    // collections page
	    .when('/:db_id/:coll_id', {
	    	templateUrl: 'views/collections.html',
	    	controller: 'CollectionController'
	    })

	    // documents page
	    .when('/:db_id/:coll_id/:doc_id', {
	    	templateUrl: 'views/documents.html',
	    	controller: 'DocumentController'
	    });

	$locationProvider.html5Mode(false).hashPrefix('!');

}]);