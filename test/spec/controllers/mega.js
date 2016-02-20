'use strict';

describe('Controller: MegaCtrl', function () {

  // load the controller's module
  beforeEach(module('plutoniumApp'));

  var MegaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MegaCtrl = $controller('MegaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
