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

    

  	$scope.initProject = function(){
      console.log("got data: ");
      console.log($scope.project);
  		var q = $q.defer();

  		$http({
  			method: 'POST',
  			url: 'http://noble.localtunnel.me/init',
        // url: 'http://localhost:8000/init',
        	data: $scope.project
  		}).then(function success(response){
        console.log(response);
  			q.resolve();
  		}, function error(response){
        console.log(response);
  			q.reject();	
  		})

  		return q.promise;
  	}

    $scope.go = function(path){
    	$scope.initProject();
    	$location.path(path);
    }
  });
