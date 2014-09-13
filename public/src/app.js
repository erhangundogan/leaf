'use strict';

// Declare app level module which depends on filters, and services
angular.module('leaf', [
  'ngRoute',
  'leaf.services',
  'leaf.controllers',
  'leaf.directives'
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
    .when('/login',
      {
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
