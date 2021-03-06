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
      productService.search(name)
        .success(function(result){
          $scope.records = result.data ? result.data : [];
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
  .controller('productExtendedController',[
    '$scope',
    '$routeParams',
    'productService',
    function($scope, $routeParams, productService){
      productService.getByBarcode($routeParams.barcode).success(function(result){
        if(result.data){
          $scope.record = result.data;
        }else{

        }
      });
  }])
  .controller('barcodeController',['$scope','productService', function($scope, productService){

    $scope.getProduct = function(code){
      productService.getByBarcode(code).success(function(result){
        if(result.data){
          $scope.hasResult = 'true';
          $scope.record = result.data;
        }else{
          $scope.record = null;
          $scope.hasResult = 'false';
        }
      });
    };

    $scope.submitProduct = function(record){
      debugger;
      productService.post(record).success(function(result){
        if(result.data){
          debugger;
          $scope.record = result.data;
          $scope.hasResult = 'true';
        }else {
          alert('result.data undefined');
        }
      });
    };
  }])
  .controller('loginController',['$scope',function($scope){

  }])
  .controller('impactController',['$scope', function($scope){

  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }]);
