'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    debugger;
  $routeProvider
    .when('/',{
      templateUrl: 'templates/landing.html',
      controller: 'landingController'
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
