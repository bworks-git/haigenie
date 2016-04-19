var haigenie = angular.module('haigenie');

haigenie.controller('OrderDetailController',['$scope','$rootScope','$http','$routeParams',function(
	$scope,$rootScope,$http,$routeParams){
	$scope.order_id=$routeParams.id;
	$http.get('/api/order/'+$scope.order_id).success(function(data){
		$scope.order=data;

	});
}]);