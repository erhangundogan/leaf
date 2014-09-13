'use strict';

/* Directives */


angular.module('leaf.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
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
  }]);
