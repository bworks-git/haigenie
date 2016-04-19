var haigenie = angular.module('haigenieFront');

haigenie.controller('UserProfileController',['$scope','$rootScope','$http','Cart',function(
	$scope,$rootScope,$http,Cart){
	$rootScope.cart_items = Cart.getCart();
	$http.get('/api/user/details').success(function(data){
		$rootScope.profile = data;
		$scope.email = $rootScope.profile.email;
		$scope.email1 = $rootScope.profile.email;
		$scope.name = $rootScope.profile.name;
		
		$scope.mobile = $rootScope.profile.mobile;
		$scope.birthdate = $rootScope.profile.birthdate;
		$scope.gender = $rootScope.profile.gender;
		$scope.alternate_mobile = $rootScope.profile.alternate_mobile;
		$scope.doorno = $rootScope.profile.doorNo;
		$scope.area = $rootScope.profile.area;
		 $scope.street1 = $rootScope.profile.street1;
		 $scope.street2 = $rootScope.profile.street2;
		 $scope.landmark = $rootScope.profile.landmark;
		$scope.city = $rootScope.profile.city;
		 $scope.state = $rootScope.profile.state;
		 $scope.country = $rootScope.profile.country;
		 $scope.pincode = $rootScope.profile.pincode;

	});

	$scope.updateInfo = function(){
		 var data={
		 	email:$scope.email,
		 	name:$scope.name,
		 	mobile:$scope.mobile,
		 	alternate_mobile : $scope.alternate_mobile,
		 	gender:$scope.gender,
		 	birthdate:$scope.birthdate
		  }
		$http.post('/api/user/details',data).success(function(data){
			alert(data);
		});
	}
	$scope.updateAddress = function(){
		 var data={
		 	doorno:$scope.doorno,
		 	street1:$scope.street1 ,
		 	street2:$scope.street2,
		 	area:$scope.area,
		 	landmark : $scope.landmark,
		 	city:$scope.city,
		 	state:$scope.state,
		 	country:$scope.country,
		 	pincode:$scope.pincode
		  }
		$http.post('/api/user/address',data).success(function(data){
			alert(data);
		});
	}

	$scope.updatePassword = function() {
		if($scope.password1 != $scope.password2){
			alert("new passwords does not match");
		}
		else if($scope.password1==null){
			alert("please enter password");
		}
		else if($scope.password_old==null){
			alert("please enter old password");
		}
		else{
			var data = {
			old_password : $scope.password_old,
			new_password : $scope.password1
			};
			$http.post('/api/user/changepassword',data).success(function(data){
				alert(data.message);
			});
		}
		
	}

}]);