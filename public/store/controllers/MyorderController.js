var haigenie = angular.module('haigenieFront');

haigenie.controller('MyorderController',['$scope','$rootScope','$http','Cart','Auth',function(
	$scope,$rootScope,$http,Cart,Auth){
	$rootScope.myorder=[];
	$rootScope.mywishlist=[];
	
	$http.get('/api/order/user').success(function(data){
		$rootScope.myorder=data;
	});
	$http.get('/api/wishlist').success(function(data){
		
		$rootScope.mywishlist=data;
	});
	
$scope.updateWishlist = function(id){
		alert(id);
		$http.post('/api/wishlist',{product_id:id}).success(function(data) {
			alert(data.message+"  "+data.action);
			$http.get('/api/wishlist').success(function(data){
				$rootScope.mywishlist=data;
			});
		});
	}
 
}]);