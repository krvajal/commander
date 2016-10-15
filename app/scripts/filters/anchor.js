'use strict';

/**
 * @ngdoc filter
 * @name sasystemCommanderApp.filter:anchor
 * @function
 * @description
 * # anchor
 * Filter in the sasystemCommanderApp.
 */
angular.module('sasystemCommanderApp')
  .filter('anchor', ['$state',function ($state) {
     return function(id) {
        return '/#' + $state.current.url + '#' + id;
    };
  }]);
