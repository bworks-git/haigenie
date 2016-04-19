var haigenie = angular.module('haigenie');

haigenie.controller('VariantController',['$scope','$http','$routeParams','cfpLoadingBar','$location',function($scope,$http,$routeParams,cfpLoadingBar,$location){
	var id = $routeParams.id;
	$scope.product_id=id;

	$scope.addVariant = function(){
		
		data= { 
				id:$scope.product_id,
				sku:$scope.sku , 
				quantity : $scope.quantity , 
				unit : $scope.unit , 
				price : $scope.price , 
				quantity:$scope.quantity ,
				stock : $scope.stock,
				status:$scope.status
			};
		$http.post('/api/product/variant',data).success(function(data){
			if(data.message=="success") $location.path('/product_edit/'+$scope.product_id);
			else alert("error");
		});
	}
	 

}]);