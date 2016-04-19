var haigenie = angular.module('haigenie');

haigenie.controller('PromotionController',['$scope','$http','$routeParams','cfpLoadingBar',
						function($scope,$http,$routeParams,cfpLoadingBar){
	$scope.orders=[];
	cfpLoadingBar.start();
	$http.get('/api/promotion/').success(function(data){
		$scope.promotions=data;
		cfpLoadingBar.complete();
	});

	$scope.postPromotion = function(){
		cfpLoadingBar.start();
		data={name:$scope.name,freebie:$scope.freebie,discount:$scope.discount};
		$http.post('/api/promotion',data).success(function(data){
			$http.get('/api/promotion/').success(function(data){
				$scope.promotions=data;
				cfpLoadingBar.complete();
			});
			alert(data.message);
		});

		
	}

	$scope.deletePromotion = function(id){
		cfpLoadingBar.start();
		$http.delete('/api/promotion/'+id).success(function(data){
			$http.get('/api/promotion/').success(function(data){
				$scope.promotions=data;
				cfpLoadingBar.complete();
			});
			alert(data.message);
		});
	}

}]);
	