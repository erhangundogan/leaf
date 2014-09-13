'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('leaf.services', []).
  value('version', '0.1')
  .factory('productService',[function(){
    return {
      get: function(id){

      },
      getByName: function(name){

      }
    }
  }]);
