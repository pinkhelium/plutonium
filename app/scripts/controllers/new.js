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
  		endpointType: "Endpoint Type"
  	}

  	$scope.pauseDeploy = true;
  	$scope.endpointType = function(type){
  		$scope.data.endpointType = type;
  	}

  	$scope.build = function(){
  		$scope.pauseDeploy = $scope.sendData();
  	}

  	$scope.sendData = function(){
  		var deferred = $q.defer();

  		$http({
  			method: 'POST',
  			url: endpoint,
  			data: $scope.data
  		}).then(function success(response){
  			deferred.resolve(false);
  		}, function error(response){
  			deferred.resolve(true);
  		})

  		return deferred.promise;
  	}

  });
