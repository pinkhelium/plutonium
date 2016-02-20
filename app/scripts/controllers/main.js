'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('MainCtrl', function ($scope,$location,$http,$q) {
    
  	$scope.createProject = function(){
  		var q = $q.defer();

  		$http({
  			method: 'POST',
  			url: 'http://localhost:8000/init'
  		}).then(function success(response){
  			q.resolve();
  		}, function error(reponse){
  			q.reject();	
  		})

  		return q.promise;
  	}

    $scope.go = function(path){
    	$scope.createProject();
    	$location.path(path);
    }
  });
