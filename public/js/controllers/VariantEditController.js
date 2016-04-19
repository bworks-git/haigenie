var haigenie = angular.module('haigenie');

haigenie.controller('VariantEditController',['$scope','$http','$routeParams','cfpLoadingBar','$location',
	function($scope,$http,$routeParams,cfpLoadingBar,$location){
	 
	$scope.product_id=$routeParams.id;
	$scope.variant_id=$routeParams.variant;
	$http.get('/api/promotion/').success(function(data){
			$scope.promotions=data;
			cfpLoadingBar.complete();
		});

	$http.get('/api/product/variant/'+$scope.product_id+'/'+$scope.variant_id).success(function(data){
		$scope.sku = data.sku ;
		$scope.quantity = parseInt(data.quantity);
		$scope.price = parseInt(data.price);
		$scope.stock = parseInt(data.stock);
		$scope.unit = data.unit;
		$scope.promotion = data.promotion;
		$scope.status = data.status;
	});

	$scope.editVariant = function(){
		var data = {
			sku:$scope.sku,
			quantity:$scope.quantity,
			price:$scope.price,
			stock:$scope.stock,
			unit:$scope.unit,
			promotion:$scope.promotion,
			status:$scope.status
		};
		$http.put('/api/product/variant/'+$scope.product_id+'/'+$scope.variant_id,data).success(function(data){
			alert(data.message);
			if(data.message=="success"){
				$location.path('/product_edit')
			}
		});
	}
}]);