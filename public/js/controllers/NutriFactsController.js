var haigenie = angular.module('haigenie');

haigenie.controller('NutriFactsController',['$scope','$http','$routeParams','cfpLoadingBar',function($scope,$http,$routeParams,cfpLoadingBar){
	cfpLoadingBar.start();
	var id = $routeParams.id;
	$http.get('/api/nutrifact/'+id).success(function(data){
		$scope.nutrifacts = data;
		cfpLoadingBar.complete();
	});

	$scope.updateList = function(){
		$http.get('/api/nutrifact/'+id).success(function(data){
			$scope.nutrifacts = data;
		});
	}

	$scope.addNutrition = function(){
		cfpLoadingBar.start();
		$http.post('/api/nutrifact/',{productId:id ,nutrition:$scope.nutrition , value : $scope.value}).success(function(data){
			$scope.updateList();
			alert(data.message);
			cfpLoadingBar.complete();
		});
	}

	$scope.deleteNutrifact = function(id){
		cfpLoadingBar.start();
		$http.delete('/api/nutrifact/'+id).success(function(data){
			$scope.updateList();
			alert(data.message);
			cfpLoadingBar.complete();
		})
	}

}]);