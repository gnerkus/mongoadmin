var mongoAdmin = angular.module('mongoAdmin', [
	'ngRoute', 
	'appRoutes', 
	'MainCtrl', 
	'DatabaseCtrl', 
	'CollectionCtrl', 
	'DocumentCtrl', 
	'DatabaseService', 
	'CollectionService', 
	'DocumentService'
	]);