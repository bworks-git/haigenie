var haigenie = angular.module('haigenieFront');

haigenie.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/store/views/products_tab.html',
                controller  : 'HomeController'
            }).when('/user_profile', {
                templateUrl : '/store/views/user_profile.html',
                controller  : 'UserProfileController'
            }).when('/product/:id', {
                templateUrl : '/store/views/detail_page.html',
                controller  : 'ProductController'
            })
            .otherwise({
				        redirectTo: '/'
			});
});