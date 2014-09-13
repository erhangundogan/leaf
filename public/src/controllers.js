'use strict';

/* Controllers */

angular.module('leaf.controllers', [])
  .controller('landingController',['$scope', function($scope){
    $scope.filterObject = "";
  }])
  .controller('searchController',['$scope','$routeProvider', function($scope, $routeProvider){
    switch ($scope.filter){
      case 'product':
        $scope.type = 'Products';
      break;
    }
  }])
  .controller('impactController',['$scope', function($scope){

  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }]);
