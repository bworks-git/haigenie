var haigenie = angular.module('haigenieFront', ['LocalStorageModule','ngRoute']);

haigenie.filter('getByCategory', function() {
  return function(input, category) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].category == +category) {
        return input[i];
      }
    }
    return null;
  }
});

haigenie.run(function($rootScope,$http, $location,Auth,Cart) {
    $rootScope.location = $location;
    $rootScope.logout = function(){
        Auth.logout();
        $rootScope.loggedIn="no";
        Cart.removeCart();
        window.location.reload();
        
    }
   $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if($location.path()=='/user_profile'){
            
                $http.get('/api/user/me').success(function(data){
                    if(data.message=="error"||data.message=="no token provided"){
                        $location.path('/');

                    }else{
                        $rootScope.userId=data._id;
                    }
                });
            }
});
   $rootScope.$on('$routeChangeSuccess', function() {
    scroll2top();
   });

});




