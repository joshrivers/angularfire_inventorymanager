'use strict';

/**
 * @ngdoc function
 * @name inventorymanagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventorymanagerApp
 */
angular.module('inventorymanagerApp')
  .controller('MainCtrl', function($scope) {
    var thingFactory = function(description, container) {
      var thing = {};
      thing.description = description;
      thing.container = container;
      thing.containedItems = [];
      thing.containedDescendants = function() {
      	var descendants = thing.containedItems.slice(0);
      	angular.forEach(thing.containedItems, function(value, key){
      		descendants = descendants.concat(value.containedDescendants());
      	});
      	return descendants;
      };
      thing.hasItems = function() {
        return thing.containedItems.length > 0;
      };
      thing.add = function(thingToAdd) {
        if (thingToAdd.parent) {
          thingToAdd.parent.remove(thingToAdd);
        }
        thingToAdd.parent = thing;
        thing.containedItems.push(thingToAdd);
      };
      thing.remove = function(thingToRemove) {
        var index = thing.containedItems.indexOf(thingToRemove);
        if (index != -1) {
          thing.containedItems.splice(index, 1);
        };
      }
      return thing;
    };
    $scope.addMode = true;
    $scope.setAddMode = function() {
      $scope.addMode = true;
    };
    $scope.addItemDescription = '';
    $scope.addItemContainer = false;
    $scope.selectedThing = null;
    $scope.addItemClicked = function() {
      var thing = thingFactory($scope.addItemDescription, $scope.addItemContainer);
      $scope.awesomeThings.add(thing);
      $scope.addItemDescription = '';
      $scope.addItemContainer = false;
    };
    $scope.awesomeThings = thingFactory("The World", true);
    $scope.awesomeThings.add(thingFactory("Bag of Holding", true));
    $scope.awesomeThings.add(thingFactory("Vorpal Sword", false));
    $scope.selectForEditing = function(thing) {
      $scope.selectedThing = thing;
      $scope.addMode = false;
    };
    $scope.moveToContainer = function(thingToMove, newParent) {
      newParent.add(thingToMove);
    };
    $scope.containerThingsExcludingSelfAndParent = function(self) {
      if (self == null) return;
      var containers = [];
      if (self.parent !== $scope.awesomeThings) {
      	containers.push($scope.awesomeThings);
      }
      angular.forEach($scope.awesomeThings.containedDescendants(), function(value, key) {
        if (value.container && (value !== self) && (value !== self.parent)) {
        	console.log(self.parent, value, (value !== self.parent));
          containers.push(value);
        }
      });
      return containers;
    };
  });