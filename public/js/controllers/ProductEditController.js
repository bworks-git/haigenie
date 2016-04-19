var haigenie = angular.module('haigenie');


haigenie.controller('ProductEditController',['$scope','$routeParams','$http','cfpLoadingBar',function($scope,$routeParams,$http,cfpLoadingBar){
	var id = $routeParams.id;
	$scope.product_id=id;
	cfpLoadingBar.start();
	$http.get('/api/product/'+id).success(function(data){
		$scope.products = data ;
		$scope.name = data.title;
		$scope.brand = data.brand ;
		$scope.manufacturer = data.manufacturer ;
		$scope.variants = data.variant;
		$scope.tax = parseInt(data.tax);
		$scope.material_feature =data.material_feature ;
		$scope.description = data.description;
		$scope.category = data.category;
		$scope.promotion = data.promotion;
		$scope.saleType = data.saleType;
		$scope.status = data.status;
		$scope.point1 = data.point1 ;
		$scope.point2 = data.point2 ;
		$scope.point3 = data.point3 ;
		$scope.point4 = data.point4 ;
		$scope.mainImage = data.mainImage ;
		$scope.thumbImage1 = data.thumbImage1 ;
		$scope.thumbImage2 = data.thumbImage2 ;
		$scope.thumbImage3 = data.thumbImage3 ;
		cfpLoadingBar.complete();
	});
	$http.get('/api/category').success(function(data){
		$scope.categories = data ;
	});
	$scope.editProduct = function(){
		cfpLoadingBar.start();
		var data = {
			title : $scope.name ,
			//sku:$scope.sku,
			brand : $scope.brand,
			manufacturer : $scope.manufacturer ,
			description : $scope.description ,
			/*price : $scope.price ,
			quantity : $scope.quantity ,
			unit : $scope.unit ,
			stock : $scope.stock ,*/
			material_feature : $scope.material_feature ,
			point1 : $scope.point1,    
			point2 : $scope.point2,    
			point3 : $scope.point3,    
			point4 : $scope.point4,   
			mainImage : $scope.mainImage,
			thumbImage1 : $scope.thumbImage1 ,  
			thumbImage2 : $scope.thumbImage2 ,  
			thumbImage3 : $scope.thumbImage3 ,  
			tax : $scope.tax ,
			category : $scope.category ,
			promotion : $scope.promotion ,
			saleType : $scope.saleType,
			status : $scope.status
		};

		$http.put('/api/product/'+id,data).success(function(data){
			alert(data.message);
			cfpLoadingBar.complete();
		});

	}
	$scope.deleteVariant = function(variant_id){
		data = { id:$scope.product_id , variant:variant_id};
		$http.delete('/api/product/variant/'+data.id+'/'+data.variant).success(function(data){
			alert(data.message);
			$http.get('/api/product/'+id).success(function(data){
					$scope.variants = data.variant;
					
				});

		});
	}
}]);