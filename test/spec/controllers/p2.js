'use strict';

describe('Controller: P2Ctrl', function () {

  // load the controller's module
  beforeEach(module('plutoniumApp'));

  var P2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    P2Ctrl = $controller('P2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(P2Ctrl.awesomeThings.length).toBe(3);
  });
});
