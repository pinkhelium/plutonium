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
  			deferred.resolve(true);
  		}, function error(response){
  			deferred.resolve(false);
  		})

  		return deferred.promise;
  	}

  });
