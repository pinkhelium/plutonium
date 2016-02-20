'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:MegaCtrl
 * @description
 * # MegaCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('MegaCtrl', function ($scope) {
   
  	$scope.project = {
      name : '',
      repo_url: ''
    };

  	$scope.data = {
  		method_type: "Endpoint Type",
      	function_name: "function_name",
      	version_number: 1,
      	project_name: $scope.project.name
  	}

  	$scope.$watch('project.name', function(){
  		$scope.data.project_name = $scope.project.name;
  	})

  	

  });
