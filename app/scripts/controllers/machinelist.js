'use strict';

/**
 * @ngdoc function
 * @name sasystemCommanderApp.controller:MachinelistCtrl
 * @description
 * # MachinelistCtrl
 * Controller of the sasystemCommanderApp
 */
angular.module('sasystemCommanderApp')
  .controller('MachineListCtrl', function ($scope, Ref, $firebaseArray) {

    $scope.machines = $firebaseArray(Ref.child('machines'));

    $scope.newMachine = {};
    $scope.resetNewMachine = function(){

      $scope.newMachine = {};
    };

    $scope.addNewMachine = function (){

        $scope.machines.$add($scope.newMachine).then(function(ref) {

            var dialog = angular.element("#add-machine-modal");
            dialog.modal("hide");
        });

    };

  });
