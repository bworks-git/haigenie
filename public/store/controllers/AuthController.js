var haigenie = angular.module('haigenieFront');

haigenie.controller('AuthController',['$scope','$rootScope','$http','Auth','$location',
	function($scope,$rootScope,$http,Auth,$location
		){

	$scope.register = function(){
		if($scope.password != $scope.confirmPassword){
			alert('Passwords does not match');
		}
		else{
			data = { name:$scope.name , email: $scope.email , password : $scope.password };
			$http.post('/api/user/register',data).success(function(data){
				if(data.message=="error"){
					alert("Email already exists");
					
				}
				else{
					alert("success");
					closeLogin();
				}
			});
		}
	}

	$scope.doLogin = function(){
		
		
		Auth.login($scope.email,$scope.password).success(function(data){
			if(data[0].message == "success") {
			
				alert('success ');
				$rootScope.loggedIn="yes";
				$http.get('/api/order/user').success(function(data){
					$rootScope.myorder=data;
				});
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
				closeLogin();
				
			}
			else {
				alert('invalide credentials');
				
			}
		});
		}

		$scope.forgetPassword = function(){

			$http.post('/api/user/forgetpassword',{email:$scope.forgetemail}).success(function(data){
				alert("If you have an account then the email will be sent to your give mail id");
			});
		}
}]);