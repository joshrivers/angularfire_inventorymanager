'use strict';

/**
 * @ngdoc function
 * @name inventorymanagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventorymanagerApp
 */
angular.module('inventorymanagerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
