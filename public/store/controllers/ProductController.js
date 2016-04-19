var haigenie = angular.module('haigenieFront');

haigenie.controller('ProductController',['$scope','$rootScope','$window','$routeParams','$http','Cart','Auth',function(
	$scope,$rootScope,$window,$routeParams,$http,Cart,Auth){
	$rootScope.cart_items = Cart.getCart();
	$scope.product_id=$routeParams.id;
	$scope.selected = '';
	$scope.new_rating=3.5;
	$scope.Math = $window.Math;
	$scope.nutrifacts=[];
	$scope.reviews=[];
	$scope.wish=0;
	$http.get('/api/product/'+$scope.product_id).success(function(data){

		$scope.detail = data;
		$scope.variant_select=$scope.detail.variant[0]._id;
		$http.get('/api/nutrifact/'+$scope.product_id).success(function(data){

			$scope.nutrifacts = data;
		});
		$http.get('/api/review/'+$scope.product_id).success(function(data){
			$scope.reviews = data ;
			
		});
		for(var i=0;i<$rootScope.mywishlist.length;i++){
			if($scope.detail._id==$rootScope.mywishlist[i].product[0]._id){
				$scope.wish=1;
			
			}
		}
		ready();
	});
 	$scope.postReview = function(){
 		$http.post('api/review/',{productId:$scope.detail._id,productName:$scope.detail.title,rating:$scope.new_rating,review:$scope.new_review}).success(function(data){
 			alert(data.message);
 		})
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
			if(data.message=="success"){
				if(data.action=="removed"){
					$scope.wish=0;
				}
				else{
					$scope.wish=1;
				}
			}
			$http.get('/api/wishlist').success(function(data){
				$rootScope.mywishlist=data;
			});
		});
	}

}]);