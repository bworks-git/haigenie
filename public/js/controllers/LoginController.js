var haigenie = angular.module('haigenie');


haigenie.controller('LoginController',['$scope','Auth','$location','cfpLoadingBar',function($scope,Auth,$location,cfpLoadingBar){
	
	$scope.doLogin = function(){
		cfpLoadingBar.start();
		Auth.login($scope.email,$scope.password).success(function(data){
			if(data.message === "success") {
				cfpLoadingBar.complete();
				$location.path('/');
			}
			else {
				swal("Ooops!","Invalid Credentials ." ,"error");
				cfpLoadingBar.complete();
			}
		});
		
	}
	
}]);