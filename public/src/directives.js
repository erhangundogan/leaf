'use strict';

/* Directives */


angular.module('leaf.directives', [])
  .directive('header',function(){
    return {
      templateUrl: 'templates/header.html'
    }
  })
  .directive('product', [function() {
    return {
      scope: {
        record: '=product'
      },
      replace: true,
      templateUrl: 'templates/product.html'
    };
  }])
  .directive('productExtended', [function() {
    return {
      scope: {
        record: '=product'
      },
      replace: true,
      templateUrl: 'templates/productExtended.html'
    };
  }]);
