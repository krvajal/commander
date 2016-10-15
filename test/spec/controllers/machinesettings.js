'use strict';

describe('Controller: MachinesettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('sasystemCommanderApp'));

  var MachinesettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MachinesettingsCtrl = $controller('MachinesettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
