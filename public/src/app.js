'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
    debugger;
  $routeProvider
    .when('/',{
      templateUrl: 'templates/landing.html',
      controller: 'landingController'
    })
    .when('/view1',
      {
        templateUrl: 'templates/partial1.html',
        controller: 'MyCtrl1'
      });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
