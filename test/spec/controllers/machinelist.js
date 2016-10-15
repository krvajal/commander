'use strict';

describe('Controller: MachinelistCtrl', function () {

  // load the controller's module
  beforeEach(module('sasystemCommanderApp'));

  var MachinelistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MachinelistCtrl = $controller('MachinelistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
