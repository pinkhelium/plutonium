'use strict';

describe('Controller: NewCtrl', function () {

  // load the controller's module
  beforeEach(module('plutoniumApp'));

  var NewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCtrl = $controller('NewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewCtrl.awesomeThings.length).toBe(3);
  });
});
