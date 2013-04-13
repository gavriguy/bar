'use strict';

var timelineClientFeatureApp = angular.module('timelineClientFeatureApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .directive('timeline', function(){
    return {
      restrict: 'E',
      require: 'ngModel',
      replce: true,
      link: function(scope, element, attrs, ngModel) {
        scope.perc = attrs.perc;
        ngModel.$render = function() {
          var events = ngModel.$viewValue;
          var renderer = '';
          for (var i = 0; i < events.length; i++) {
             var perc = (i == 0)  ? events[i].start_time : events[i].start_time - events[i-1].start_time;
             renderer += '<div class="bar bar-warning" style="width: '+ perc +'%;"></div>';
             renderer += '<div class="bar bar-danger" style="width: 0.5%;"></div>';
           };
           var output = '<div class="progress ticks">' + renderer + '</div>';
           element.html(output);
        }
      }
    }
  });
