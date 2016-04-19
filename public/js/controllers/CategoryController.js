var haigenie = angular.module('haigenie');

haigenie.controller('CategoryController',['$scope','$http','cfpLoadingBar',function($scope,$http,cfpLoadingBar){
	cfpLoadingBar.start();
	$http.get('/api/category').success(function(data){
		$scope.categories = data ;
		cfpLoadingBar.complete();
	});

	$scope.addCategory = function(){
		cfpLoadingBar.start();
		$http.post('/api/category',{ name : $scope.name , status : $scope.status}).success(function(data){
			$scope.updateList();
			if(data.message === "Category has been created")
				swal("Success!", "New Category has been created successfully!", "success");
			else 
				swal("Ooops!","Cannot create new category. Please check the category is already available or not before trying again ." ,"error");
			cfpLoadingBar.complete();
		});
	}

	$scope.changeStatus = function(id,name,status){
		cfpLoadingBar.start();
		if(status=="active"){
			$http.put('/api/category/'+id,{ name : name , status : "inactive" }).success(function(data){
				$scope.updateList();
				if(data.message === "success")
					swal("Success!", "Category status changed successfully!", "success");
				else 
					swal("Ooops!","Something went wrong. Please try again ." ,"error");
				
				cfpLoadingBar.complete();
			});
		}
		else {
			$http.put('/api/category/'+id,{ name : name , status : "active" }).success(function(data){
				$scope.updateList();
				if(data.message === "success")
					swal("Success!", "Category status changed successfully!", "success");
				else 
					swal("Ooops!","Something went wrong. Please try again ." ,"error");
				cfpLoadingBar.complete();
			});
		}
	}

	$scope.deleteCategory = function(id){
		cfpLoadingBar.start();
		$http.delete('/api/category/'+id).success(function(data){
			$scope.updateList();
			if(data.message === "Category deleted succesfully")
					swal("Success!", "Category deleted successfully!", "success");
				else 
					swal("Ooops!","Something went wrong. Please try again ." ,"error");
			cfpLoadingBar.complete();
		})
	}

	$scope.updateList = function(){
		$http.get('/api/category').success(function(data){
			$scope.categories = data ;
		});
	}
}]);