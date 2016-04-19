var haigenie = angular.module('haigenie');

haigenie.controller('OrderController',['$scope','$http','$routeParams','cfpLoadingBar',
						function($scope,$http,$routeParams,cfpLoadingBar){
	$scope.orders=[];
	cfpLoadingBar.start();
	$http.get('/api/order/').success(function(data){
		$scope.orders=data;
		cfpLoadingBar.complete();
	});

	$scope.changeStatus = function(order_id,status){
		cfpLoadingBar.start();
		$http.put('/api/order/change_status',{status:status,order_id:order_id}).success(function(data){
			if(data.message=="success"){
				$http.get('/api/order/').success(function(data){
					$scope.orders=data;
					cfpLoadingBar.complete();
				});
				alert("success");
			}
			else{
				alert("failed");
			}
		});
		cfpLoadingBar.start();
	}

}]);
	