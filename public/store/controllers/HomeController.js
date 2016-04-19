var haigenie = angular.module('haigenieFront');
haigenie.controller('HomeController',['$scope','$rootScope','$http','Auth','Cart','$location','$window',
	function($scope,$rootScope,$http,Auth,Cart,$location,$window){
		
		$scope.Math = $window.Math;
		$rootScope.cart_items = Cart.getCart();
		$rootScope.title = "All Products";	
	
	$scope.cart_count = 0;
	$scope.loadData = function(category){
		
		$http.get('/api/product/category/'+category).success(function(data){
		$scope.products = data ;
		
	});
	}

      $scope.filterCategory = function(variants){
			return $filter('filter')(variants, {status:'active'}, true);
      }
	
	$scope.add2cart = function(product_id,name,qty,img,selected_variant,tax){
		 
		$http.get("/api/product/variant/"+product_id+"/"+selected_variant).success(function(data){
			
			var subtotal = $scope.Math.round((parseInt(tax)/100)*parseInt(data.price)*qty)+(parseInt(data.price)*qty) ;
			Cart.setCart(product_id,name,selected_variant,img,data.quantity,data.unit,qty,data.price,tax,subtotal);
			$rootScope.cart_count= Cart.getCart().length;
			$rootScope.cart_items = Cart.getCart();
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
		});
		
		
	}

	$scope.updateWishlist = function(id){
		alert(id);
		$http.post('/api/wishlist',{product_id:id}).success(function(data) {
			alert(data.message+"  "+data.action);
			$http.get('/api/wishlist').success(function(data){
		$rootScope.mywishlist=data;
	});
		});
	}
	
}]);