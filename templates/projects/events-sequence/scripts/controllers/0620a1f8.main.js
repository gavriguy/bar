'use strict';

var MainCtrl = ['$scope', '$timeout', '$filter', function($scope, $timeout, $filter) {
  $timeout(function(){
     $("#chooseID").joyride({});
  },500);


  $scope.episodeDuration = '01:05:00';
  $scope.activeEvent = 'new';
  $scope.showForm = true;

  var dontEdit = false;
  $scope.onEditMode = function() {
    return $scope.myForm.$dirty;
  }

  $scope.eventTitle = function() {
    return ($scope.activeEvent == 'new') ? 'Add new event' : 'Edit';
  }

  function reloadForm() {
    $scope.showForm = false;
    $timeout(function(){
      $scope.showForm = true;
    },10)
  }
  function resetEditForm()  {
    
    $scope.name = '';
    $scope.start = '';
    $scope.end = '';
    
  }

  $scope.events = [
    { 
      id: 'first',
      name: "Who is going to win the battle",
      type: "poll",
      start: '00:00:20',
      end: '00:00:40'
    },
    
    {
      id: 'second',
      name: "Choose your prefered character",
      type: "poll",
      start: '00:00:01',
      end: '00:00:05'
    },

    {
      id: 'outOfTimeFrame',
      name: "Choose your prefered character",
      type: "poll",
      start: '01:10:21',
      end: '01:10:43'
    }
  
  ] 
  $scope.newEvent = function() {
    $scope.activeEvent = 'new';
    reloadForm();
    resetEditForm();
  }
  $scope.saveEvent = function() {
    var index;
    var event = {
      name: this.name,
      type: this.type,
      start: this.start,
      end: this.end
    }
    if ($scope.activeEvent != 'new') {
      index = getEventIndexById($scope.activeEvent);
      var extendedEvent = _.extend($scope.events[index], event);
      $scope.events[index] = extendedEvent;
      $scope.newestEventId = extendedEvent.id;
    }
    else {
      event.id = new Date().getTime();
      $scope.events.push(event);
      $scope.newestEventId = event.id;
    }
    resetEditForm();
    $scope.activeEvent = 'new';
    this.myForm.$setPristine();
    reloadForm();
  }
 
  $scope.deleteEvent = function(id) {
    dontEdit = true;
    $timeout(function(){
      $scope.events.splice(getEventIndexById(id), 1);
      resetEditForm();
      $scope.newEvent();  
      dontEdit = false;
    },200);
     
  }
  function getEventIndexById(id) {

    var item = _.findWhere($scope.events, {id:id});

    return (_.indexOf($scope.events, item));   
  }
  $scope.editEvent = function(event) {
    if (dontEdit) return;
    var index = getEventIndexById(event.id);
    $scope.name = $scope.events[index].name;
    $scope.type = $scope.events[index].type;
    $scope.start = $scope.events[index].start;
    $scope.end = $scope.events[index].end;
    $scope.activeEvent = event.id;
    reloadForm();
  }
  $scope.isSelected = function(id) {
    return ($scope.activeEvent == id) ? 'selected' : '';
  }


  $scope.isTimeError = function(start) {
    
    //console.log(parseInt($scope.episodeDuration.replace(/:/gi,'')), parseInt(start.replace(/:/gi,'')));
    return (parseInt($scope.episodeDuration.replace(/:/gi,'')) < parseInt(start.replace(/:/gi,''))) ? 'time-error' : '';
  }
  $scope.isNew = function(id) {
    return ($scope.newestEventId == id) ? 'fadeInDown' : '';
  }

  $scope.cancel = function() {
    $scope.activeEvent = 'new';
    resetEditForm();
    this.myForm.$setPristine();
  }
}]