var haigenie = angular.module('haigenieFront');

haigenie.controller('OrderController',['$scope','$rootScope','$http','Cart',function(
	$scope,$rootScope,$http,Cart){

	$http.get('/api/user/details').success(function(data){

		$rootScope.profile_email = data.email;
		$rootScope.profile_name = data.name;
		
		$rootScope.profile_mobile = data.mobile;
		$rootScope.profile_birthdate = data.birthdate;
		$rootScope.profile_gender = data.gender;
		$rootScope.profile_alternate_mobile = data.alternate_mobile;
		$rootScope.profile_doorNo = data.doorNo;
		 $rootScope.profile_street1 = data.street1;
		 $rootScope.profile_street2 = data.street2;
		 $rootScope.profile_area = data.area;
		 $rootScope.profile_landmark = data.landmark;
		$rootScope.profile_city = data.city;
		 $rootScope.profile_state = data.state;
		 $rootScope.profile_country = data.country;
		 $rootScope.profile_pincode = data.pincode;

	});

	$scope.postOrder = function(){
		var data = {
			email:$rootScope.profile_email,
			name: $rootScope.profile_name,
			mobile : $rootScope.profile_mobile,
			city:$rootScope.profile_city,
			state:$rootScope.profile_state,
			country:$rootScope.profile_country,
			pincode:$rootScope.profile_pincode,
			landmark:$rootScope.profile_landmark,
			area:$rootScope.profile_area,
			doorNo:$rootScope.profile_doorNo,
			street1:$rootScope.profile_street1,
			street2:$rootScope.profile_street2,
			subtotal:$rootScope.subtotal,
			items:Cart.getCart()
		}
		$http.post('/api/order/',data).success(function(data){
			if(data.message=="no token provided"){
				alert("you need to login before placing order");
			}
			else if(data.message=="failed"){
				alert("something went wrong");
			}
			else{
				alert("success");
				Cart.removeCart();
				$rootScope.cart_count=0;
				$rootScope.cart_items = Cart.getCart();
				$rootScope.subtotal=0;
				$rootScope.shipping=0;
				$rootScope.grand_total=0;
				$http.get('/api/order/user').success(function(data){
					$rootScope.myorder=data;
				});
				closeCheckout();
			}
		});
	}

}]);