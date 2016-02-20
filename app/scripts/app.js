'use strict';

/**
 * @ngdoc overview
 * @name plutoniumApp
 * @description
 * # plutoniumApp
 *
 * Main module of the application.
 */
angular
  .module('plutoniumApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.ace',
    'ngToast'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'MainCtrl'
      })
      .when('/project', {
        templateUrl: 'views/p2.html',
        controller: 'P2Ctrl',
        controllerAs: 'p2'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    })
  }])
  .directive("centered", function() {
  return {
    restrict : "ECA",
    transclude : true,
    template : "<div class=\"angular-center-container\">\
            <div class=\"angular-centered\" ng-transclude>\
            </div>\
          </div>"
  };
});
