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
  			//url: 'http://noble.localtunnel.me/init',
        url: 'http://localhost:8000/init',
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

    $scope.openProject = function(){

      var q = $q.defer();

      $http({
        method: 'POST',
        url: 'http://localhost:8000/openproject',
        data: {
          "project_name": $scope.project.name
        }
      }).then(function success(response){
        q.resolve(response.data);
      }, function error(response){
        q.reject(response.data);
      })

      return q.promise;
    }

    $scope.go = function(path){
    	var promise = $scope.initProject();
      promise.then(function(){
        //$scope.documentation = {};
        $location.path(path);
      })
    };

    $scope.goAndPopulate = function(path){
      
      var promise = $scope.openProject();
      promise.then(function(response){
        console.log(response);
        $scope.$parent.documentation = response.doc.documentation;
        
        console.log($scope.documentation);
        $location.path(path);
      })
    }
  });
