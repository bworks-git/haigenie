var haigenie = angular.module('haigenie');


haigenie.controller('ProductCreateController',['$scope','$http','$location','cfpLoadingBar',function($scope,$http,$location,cfpLoadingBar){
	cfpLoadingBar.start();
	$http.get('/api/category').success(function(data){
		$scope.categories = data ;
		
	});
	$http.get('/api/promotion/').success(function(data){
			$scope.promotions=data;
			cfpLoadingBar.complete();
		});

	$scope.addProduct = function(){
		cfpLoadingBar.start();
		var data = {
			title : $scope.name ,
			brand : $scope.brand,
			manufacturer : $scope.manufacturer ,
			description : $scope.description ,
			price : $scope.price ,
			quantity : $scope.quantity ,
			unit : $scope.unit ,
			stock : $scope.stock ,
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
			sku : $scope.sku,
			status : $scope.status
		};

		$http.post('/api/product',data).success(function(data){
			$location.path('/#/product')
			cfpLoadingBar.complete();
			alert(data.message);
		});

	}
}]);