'use strict';

/* Controllers */

angular.module('leaf.controllers', ['ngRoute'])
  .controller('landingController',['$scope', '$location', function($scope, $location){
    $scope.filterObject = "";

    $scope.doSearch = function(name){
      $location.path('search/product/' + name);
    }
  }])
  .controller('searchController',['$scope','$routeParams', function($scope, $routeParams){
    $scope.doSearch = function(name){

    }

    switch ($routeParams.filter){
      case 'product':
        $scope.type = 'Products';
      break;
    }
  }])
  .controller('impactController',['$scope', function($scope){

  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }]);
