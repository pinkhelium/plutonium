'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:DeployCtrl
 * @description
 * # DeployCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('DeployCtrl', function ($scope,$location,$q,$http) {
    
  	$scope.deploy = function(type){
  		$scope.deployDetails.type = type;
  		var promise = $scope.sendDeployDetails();
  		promise.then(function(){
  			$location.path('/project');
  		})
  	}

  	$scope.sendDeployDetails = function(){
  		var q = $q.defer();

  		$http({
  			method: 'POST',
  			url: 'http://noble.localtunnel.me/deploy',
  			data: $scope.deployDetails
  		}).then(function success(response){
  			q.resolve(response)
  		}, function error(response){
  			q.reject(response);
  		})

  		return q.promise;
  	}

  });
