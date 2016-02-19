'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
