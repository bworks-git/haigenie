var haigenie = angular.module('haigenie');

haigenie.controller('ProductController',['$scope','$http','cfpLoadingBar',function($scope,$http,cfpLoadingBar){
	cfpLoadingBar.start();
	$http.get('/api/product').success(function(data){
		$scope.products = data ;
		cfpLoadingBar.complete();
	});
	
	$scope.updateList = function(){
		$http.get('/api/product').success(function(data){
			$scope.products = data ;
		});
	}
	$scope.deleteProduct=function(id){
		cfpLoadingBar.start();
		$http.delete('/api/product/'+id).success(function(data){
		$scope.updateList();
		alert(data.message);
		cfpLoadingBar.complete();
	});
	}

}]);