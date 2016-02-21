'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:P2Ctrl
 * @description
 * # P2Ctrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('P2Ctrl', function ($scope,$http,$q,ngToast,$location) {

    $scope.go = function(path){
        $location.path(path);
    }


    $scope.showTable = false;
    $scope.showNewFunction = true;
    $scope.currentContents = {};

    $scope.changeView = function (what) {
    	$scope.showNewFunction = false;
    	$scope.showTable = true;
    	$scope.currentContents = this.method;
    };

    $scope.newFunctionView = function (what) {
    	$scope.showNewFunction = true;
    	$scope.showTable = false; 
    };

    
    //New View Functions

    $scope.endpointType = function(type){
        $scope.data.method_type = type;
    };

    $scope.buildFunction = function(){

        var promise = $scope.sendData();
      promise.then(function(response){
        console.log(response);
        $scope.$parent.documentation = response.doc.documentation;
        $scope.pauseDeploy = response.fail;
        $scope.$parent.$apply();
        if($scope.pauseDeploy){
          ngToast.create({
            className: 'danger',
            content: 'Build Failed',
            dismissOnClick: true,
            dismissButton: true,
          });
        }
        else{
            // $scope.documentation = response.doc;
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
            console.log("sendDataSuccess");
        console.log(response);
            deferred.resolve(response.data);
        }, function error(response){
        console.log(response);
            deferred.resolve(response.data);
        });

        return deferred.promise;
    }
  });
