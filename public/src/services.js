'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('leaf.services', []).
  value('version', '0.1')
  .factory('productService',['$http', function($http){
    var root = 'http://leaf.gelistirme.org/api';

    return {
      get: function(id){

      },
      getAll: function(){
        return $http.get(root + '/product');
      },
      getByName: function(name){
        return $http.post(root + '/product', JSON.stringify({
          name: name
        }));
      }
    }
  }]);
