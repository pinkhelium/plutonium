'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('NewCtrl', function ($scope,$http,$q,ngToast) {
    

  	$scope.pauseDeploy = true;

  	$scope.endpointType = function(type){
  		$scope.data.method_type = type;
  	};

  	$scope.buildFunction = function(){

  		var promise = $scope.sendData();
      promise.then(function(response){
        console.log(response);
        $scope.pauseDeploy = response;
        if($scope.pauseDeploy){
          ngToast.create({
            className: 'danger',
            content: 'Build Failed',
            dismissOnClick: true,
            dismissButton: true,
          });
        }
        else{
          ngToast.create({
            className: 'success',
            content: 'Build Succeeded',
            dismissOnClick: true,
            dismissButton: true,
          });
        }
        console.log($scope.pauseDeploy);
      })
  	};

  	$scope.sendData = function(){
  		var deferred = $q.defer();
  		console.log($scope.data)
  		$http({
  			method: 'POST',
  			url: 'http://localhost:8000/function',
  			data: $scope.data
  		}).then(function success(response){
        //console.log(response);
  			deferred.resolve(response.data);
  		}, function error(response){
        //console.log(response);
  			deferred.resolve(response.data);
  		});

  		return deferred.promise;
  	}

    

  });
