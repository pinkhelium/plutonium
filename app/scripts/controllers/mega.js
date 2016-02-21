'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:MegaCtrl
 * @description
 * # MegaCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('MegaCtrl', function ($scope, $location) {
   
  	$scope.project = {
      name : '',
      repo_url: ''
    };

    $scope.documentation = {
      
    }

    $scope.deployDetails = {
      project_name: "",
      type: "",
    }

  	$scope.data = {
  		method_type: "Endpoint Type",
    	function_name: "FunctionName",
    	version_number: 1,
    	project_name: $scope.project.name,
      code: "def functionName(values):\n\t"
  	}

    $scope.pauseDeploy = true;

  	$scope.$watch('project.name', function(){
  		$scope.data.project_name = $scope.project.name;
  	})

    $scope.$watch('documentation', function(){
      console.log("here");
    })

    $scope.$watch('data.function_name', function(){
      $scope.data.code = "def " + $scope.data.function_name + "(values):\n\t\'\'\'Describe Your Function Here!\'\'\'\n\t";
    })

    $scope.$watch('project.name', function(){
      $scope.deployDetails.project_name = $scope.project.name;
    })
  	

  });
