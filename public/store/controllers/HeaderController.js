var haigenie = angular.module('haigenieFront');

haigenie.controller('HeaderController',['$scope','$rootScope','$location','$http','Cart','$filter',function(
	$scope,$rootScope,$location,$http,Cart,$filter){
	$rootScope.loggedIn = "no";
	
	$http.get('/api/user/me').success(function(data){
    			
	    		if ( data.role == "customer") {
	    			 	$rootScope.loggedIn = "yes";
			        }
	      		else if(data.role == "admin"){
	      				$rootScope.loggedIn = "yes";
	      		}
	      		else{
	      			$rootScope.loggedIn = "no";
	      		}
    });
	$http.get('/api/category/active').success(function(data){
		$scope.categories = data ;
		$http.get('/api/product/category').success(function(data){
			$rootScope.products = data ;
			$rootScope.allproducts = data ;
			
		});
	});
	if(Cart.getCart()!=null)
		$rootScope.cart_count= Cart.getCart().length;
	else $rootScope.cart_count= 0;
	
	var items =Cart.getCart();
		var total=0;
		if(items==null){
			$rootScope.subtotal = 0;
		}
		else{
			for(var i=0;i<items.length;i++){
				total+=items[i].subtotal;
			}
			$rootScope.subtotal = total;
			if(total>=600) $rootScope.shipping = 0;
			else $rootScope.shipping = 50;
			$rootScope.grand_total = $rootScope.subtotal+$rootScope.shipping;
		}
	$scope.updateSubtotal = function(){
		var items =Cart.getCart();
		var total=0;
		if(items==null){
			$rootScope.subtotal = 0;
		}
		else{
			for(var i=0;i<items.length;i++){
				total+=items[i].subtotal;
			}
			$rootScope.subtotal = total;
			if(total>=600) $rootScope.shipping = 0;
			else $rootScope.shipping = 50;
			$rootScope.grand_total = $rootScope.subtotal+$rootScope.shipping;
		}
	}
	 
	$scope.incrementItem = function(variant_id,tax,price){
		Cart.incrementItem(variant_id,tax,price);
		$rootScope.cart_items = Cart.getCart();
		$scope.updateSubtotal();
	}
	$scope.decrementItem = function(variant_id,tax,price){
		Cart.decrementItem(variant_id,tax,price);
		$rootScope.cart_items = Cart.getCart();
		$scope.updateSubtotal();
	}
	$scope.removeItem = function(index){
		Cart.removeItem(index);
		$rootScope.cart_items = Cart.getCart();
		$scope.updateSubtotal();
		$rootScope.cart_count= Cart.getCart().length;
	}
	
	$scope.filterCategory = function(name){
		if(name=='all'){
			$rootScope.title = "All Products";
			$rootScope.products = $rootScope.allproducts;
		}
		else{
			$rootScope.title = name;
			
			//var found = $filter('getByCategory')($rootScope.allproducts,name);
			$rootScope.products =$filter('filter')($rootScope.allproducts, {category:name}, true);
			scroll2product();
		}
		
	}
	$scope.search = function(){
		if($rootScope.location.path!='/') $location.path('/');
		scroll2product();
	}

}]);