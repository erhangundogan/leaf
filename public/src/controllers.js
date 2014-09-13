'use strict';

/* Controllers */

angular.module('leaf.controllers', ['ngRoute'])
  .controller('landingController',['$scope', '$location', function($scope, $location){
    $scope.filterObject = "";

    $scope.doSearch = function(name){
      $location.path('search/product/' + name);
    }
  }])
  .controller('searchController',[
    '$scope',
    '$routeParams',
    'productService',
    function($scope, $routeParams, productService){
    $scope.doSearch = function(name){
      productService.getAllByName(name)
        .success(function(result){
          $scope.records = result;
      });
    };

    switch ($routeParams.filter){
      case 'product':
        $scope.type = 'Products';
      break;
    }

    $scope.filter = $routeParams.filter;

    $scope.doSearch($scope.filter);

  }])
  .controller('loginController',['$scope',function($scope){

  }])
  .controller('impactController',['$scope', function($scope){

  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }]);
