var haigenie = angular.module('haigenie');

haigenie.config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl : '/views/login.html',
                controller  : 'LoginController'
            })
            .when('/',{
            	templateUrl : '/views/dashboard.html',
                controller  : 'DashController'
            }).when('/category',{
            	templateUrl : '/views/category.html',
                controller  : 'CategoryController'
            }).when('/product',{
            	templateUrl : '/views/product.html',
                controller  : 'ProductController'
            }).when('/product_create',{
            	templateUrl : '/views/product_create.html',
                controller  : 'ProductCreateController'
            }).when('/product_edit/:id',{
                templateUrl : '/views/product_edit.html',
                controller  : 'ProductEditController'
            }).when('/variant_edit/:id/:variant',{
            	templateUrl : '/views/variant_edit.html',
                controller  : 'VariantEditController'
            }).when('/product_variant/:id',{
            	templateUrl : '/views/variant.html',
                controller  : 'VariantController'
            }).when('/nutrifacts/:id',{
            	templateUrl : '/views/nutrifacts.html',
                controller  : 'NutriFactsController'
            })
            .when('/customer',{
                templateUrl : '/views/customers.html',
                controller  : 'CustomerController'
            })
            .when('/order',{
                templateUrl : '/views/order.html',
                controller  : 'OrderController'
            })
            .when('/order/:id',{
                templateUrl : '/views/order_detail.html',
                controller  : 'OrderDetailController'
            })
            .when('/promotion',{
                templateUrl : '/views/promotion.html',
                controller  : 'PromotionController'
            })
            .when('/review',{
            	templateUrl : '/views/review.html',
                controller  : 'ReviewController'
            })
            .otherwise({
				        redirectTo: '/'
			});
});