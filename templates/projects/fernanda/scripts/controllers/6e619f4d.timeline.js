'use strict';

eventsPageApp.controller('TimelineCtrl', ['$scope', '$timeout',function($scope, $timeout) {
 $scope.closeDialog = function() {
  $('.popover').hide();
   $timeout(function(){
   	$scope.showForm = false;
   },600);
  
 }
 $scope.showModal = function() {
 	$('.popover').fadeOut();
 	
 	$timeout(function(){
   	$('#myModal').modal()
   },100);
 }

}]);
