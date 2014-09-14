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
      getByBarcode: function(code){
        return $http.get(root + '/product?code=' + code);
      },
      getAllByName: function(name) {
        return $http.get(root + '/products?name=' + name);
      },
      post: function(record) {
        return $http.post(root + '/product', JSON.stringify(record));
      },
      search: function(name) {
        return $http.get(root + '/products/search?name=' + name);
      }
    }
  }]);
