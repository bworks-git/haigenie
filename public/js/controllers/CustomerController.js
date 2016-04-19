var haigenie = angular.module('haigenie');

haigenie.controller('CustomerController',['$scope','$http','cfpLoadingBar',function($scope,$http,cfpLoadingBar){

	cfpLoadingBar.start();

	$http.get('/api/user/').success(function(data){
		if(data.message=="error"){
			$scope.customers={};
			swal('Ooooops !' , "Error while retriving customer data",'error');
		}
		else{
			$scope.customers = data;
			cfpLoadingBar.complete();
		}
	})

}]);