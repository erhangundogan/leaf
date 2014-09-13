'use strict';

// Declare app level module which depends on filters, and services
angular.module('leaf', [
  'ngRoute',
  'leaf.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'templates/landing.html',
      controller: 'landingController'
    })
    .when('/search/:model/:filter',{
      templateUrl: 'templates/search.html',
      controller: 'searchController'
    })
    .when('/impact',{
      templateUrl: 'templates/impact.html',
      controller: 'impactController'
    })
    .when('/view1',
      {
        templateUrl: 'templates/partial1.html',
        controller: 'MyCtrl1'
      });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
