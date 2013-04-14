'use strict';

var eventsPageApp = angular.module('eventsPageApp', ['ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/timeline.html',
        controller: 'TimelineCtrl'
      })
      .when('/timeline', {
        templateUrl: 'views/timeline.html',
        controller: 'TimelineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
