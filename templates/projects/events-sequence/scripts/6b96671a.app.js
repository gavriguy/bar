'use strict';

var cmsApp = angular.module('cmsApp', ['angular-underscore'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


  cmsApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});


  cmsApp.directive('remove', function(){
    return function(scope, elm, attrs) {
        elm.bind('click', function(e){
            //console.log(elm.parent().parent().parent());
            
            //elm.parent().parent().parent().removeClass('fadeInDown');
            elm.parent().parent().parent().parent().fadeOut();


            // setTimeout(function(){
            //     scope.$apply(function(){
            //         scope.$eval(attrs.remove);
            //     });
            // }, 200);                    
        });
    };
});