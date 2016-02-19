'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('NewCtrl', function ($scope) {
    
  	$scope.data = {
  		
  	}

  	$scope.endpointType = function(type){
  		$scope.data.endpointType = type;
  	}

  });
