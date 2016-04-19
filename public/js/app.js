var haigenie = angular.module('haigenie', ['LocalStorageModule','ngRoute','ngCart','ngAnimate','cfp.loadingBar','chart.js']);

haigenie.run( ['$http','$rootScope', '$location',function($http,$rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    	if($location.path()!='/login'){
    		$http.get('/admin/me').success(function(data){
	    		if ( data.message == "error" ) {
	    				
			          $location.path( "/login" );
			        }
	      		     
    		});
    	}
    	
          
    });
 }]);

haigenie.run(function($rootScope, $location,Auth) {
    $rootScope.location = $location;
    $rootScope.logout = function(){
    	Auth.logout();
    	if(Auth.isLoggedIn()==false){
    		$location.path( "/login" );
    	}
    }
});

haigenie.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});



