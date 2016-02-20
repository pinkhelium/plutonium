'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('ProjectCtrl', function ($scope) {
    $scope.project = {
    	name: 'someProject',
    	repo_url: 'http://github.com/helloworld',
    	functions: [
    		{
    			name:'someDummyFunction1',
    			versions: ['v1','v2']
    		},
    		{
    			name:'someDummyFunction2',
    			versions: ['v1']
    		}
    	]
    };

    $scope.newFunction = function () {
    	console.log("adding new function to: ");
    	console.log($scope.project.name);
    };

	$scope.editFunction = function () {
    	console.log("editing function: ");
    	console.log(this.$parent.f.name + " - " + this.v);
    };    
  });
