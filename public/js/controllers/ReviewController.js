var haigenie = angular.module('haigenie');

haigenie.controller('ReviewController',['$scope','$http','$routeParams','cfpLoadingBar','$location',function($scope,$http,$routeParams,cfpLoadingBar,$location){
	
	$scope.reviews = [];
	$http.get('/api/review/all').success(function(data){
		$scope.reviews=data;
	});
	$scope.changeStatus = function(id){
		$http.put('/api/review/'+id).success(function(data){
			alert(data.message);
			$http.get('/api/review/all').success(function(data){
				$scope.reviews=data;
			});
		});
	}
}]);