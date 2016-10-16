'use strict';

/**
 * @ngdoc function
 * @name sasystemCommanderApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the sasystemCommanderApp
 */
angular.module('sasystemCommanderApp')
  .controller('HeaderCtrl', function ($scope,$location) {

    $scope.isActive = function (viewLocation) {

        console.log($location.path());
        return $location.path().indexOf(viewLocation) == 0;

    };

  });
