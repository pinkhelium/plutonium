'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('NewCtrl', function ($scope,$http,$q) {
    
  	$scope.data = {
  		endpointType: "Endpoint Type",
      code: "",
      name: "function_name",
  	}

  	$scope.pauseDeploy = true;
  	$scope.endpointType = function(type){
  		$scope.data.endpointType = type;
  	}

  	$scope.buildFunction = function(){
  		$scope.pauseDeploy = $scope.sendData();
  	}

  	$scope.sendData = function(){
  		var deferred = $q.defer();
  		console.log($scope.data)
  		$http({
  			method: 'POST',
  			url: 'http://localhost:8000/build',
  			data: $scope.data
  		}).then(function success(response){
  			deferred.resolve(false);
  		}, function error(response){
  			deferred.resolve(true);
  		})

  		return deferred.promise;
  	}

    $scope.$watch('data.name', function(){
      $scope.data.code = "def " + $scope.data.name + "(values): \n\t";
    })

  });
