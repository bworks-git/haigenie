angular.module('haigenie')
.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('AuthInterceptor');
}])

.factory('Auth', ['$http','$q','AuthToken', function($http,$q,AuthToken){
	var authFactory = {};
	authFactory.login = function(email,password){
		return $http.post('/admin/login',{
			email : email,
			password : password
		}).success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	}

	authFactory.logout = function(){
		AuthToken.setToken();
	}

	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()) 
			return true;
		else
			return false;
	}

	authFactory.getUser = function(){
		if(AuthToken.getToken())
		{
			return $http.get('/admin/me');
		}
		else
			return $q.reject({message: "User has no token"});
	}
	return authFactory;
}])

.factory('AuthToken', ['localStorageService', function(localStorageService){
	var authTokenFactory = {};
	authTokenFactory.getToken = function(){
		return localStorageService.get('token');
	}

	authTokenFactory.setToken = function(token){
		if(token){
			localStorageService.set('token',token);
		}
		else 
			localStorageService.remove('token');
	}

	return authTokenFactory;
}])

.factory('AuthInterceptor', ['$q','$location','AuthToken', function($q,$location,AuthToken){

	var interceptorFactory = {};
	interceptorFactory.request = function(config){
		var token = AuthToken.getToken();
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config;
	}
	
	interceptorFactory.responseError = function(response){
		if(response.status == 403 )
			$location.path('/login');
		return $q.reject(response);
	}
	return interceptorFactory;
}]);