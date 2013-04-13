'use strict';


String.prototype.toHHMMSS = function () {
    var sec_numb    = parseInt(this);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
/*

TODO - Pause duration when the seeker is paused.
TODO - Remove multiplier form the interval and put wrap the seeker instead. 

*/

timelineClientFeatureApp.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  var timeMultiplier = 10;

  $scope.pendingEventsStack = [];
  var nextEventIndex = 0;
  $scope.events = [
    {"start_time": 4, "name": "0 Event", "class":"alert-info"},
    {"start_time": 22, "name": "First Event", "class":"alert-error"},
    {"start_time": 51, "name": "Second Event" , "duration": 1000, "class":"alert-success"},
    {"start_time": 76, "name": "Third Event", "class":"alert-info"},
    {"start_time": 96, "name": "Fourth Event", "class":"alert-error"}
  ];
  $scope.activeEvent = -1;
  $scope.seekerPos = 0;
  $scope.countdownToNextEvent;
  $scope.isPlaying = false;
  var inter;
  $scope.hasPendingEvent = false;
  $scope.buttonLable = function() {
    return ($scope.isPlaying) ? 'pause' : 'play';
  }
  $scope.playPause = function() {
    if ($scope.isPlaying) {
      clearInterval(inter);
      $scope.isPlaying = false;     
    } else {
      play();   
    }
  }
  function play() {
    $scope.isPlaying = true;
     inter = setInterval(function(){
      if ($scope.seekerPos >=100) {
        $scope.isPlaying = false;
        clearInterval(inter);

      }
      $scope.$apply(function() {
        $scope.seekerPos++;
        checkTriggerEvent();
      });
   
    },100 * timeMultiplier);
  } 
  $scope.reset = function() {
    location.reload();
  }

  function checkTriggerEvent() {
    if ($scope.seekerPos == $scope.events[nextEventIndex].start_time) {
      if ($scope.events.length > nextEventIndex + 1) {
        nextEventIndex++;
      } else {
        nextEventIndex++;
        clearInterval(inter);
        $scope.seekerPos = 100;
      }
      triggerEventIfDurationSet()


      if ($scope.activeEvent == -1) {
        showTimeEvent();
      } else {
        $scope.pendingEventsStack.push(nextEventIndex -1);
        $scope.hasPendingEvent = true;
      }
      
    }
    $scope.countdownToNextEvent = (($scope.events[nextEventIndex].start_time - $scope.seekerPos)/10*timeMultiplier).toString().toHHMMSS();;
  }

  var durationHolder; 

  function triggerEventIfDurationSet() {
    $timeout.cancel(durationHolder);
    var duration = $scope.events[nextEventIndex -1].duration
    if(duration) {
      durationHolder = $timeout(function() {
        //Remove from queue
        var pendingEvent = $scope.pendingEventsStack.pop();
        //Remove the NEXT button
        $scope.hasPendingEvent = false;
        //remove event only if its the current evnet  - ???  Check this
        if (pendingEvent == nextEventIndex) {
          $scope.activeEvent = -1;
        }
      },duration * timeMultiplier);
    }
  }
  function showTimeEvent() {
    $scope.hasPendingEvent = false;
    $scope.activeEvent = nextEventIndex;
  }
  $scope.closeEvent = function() {
    if ($scope.hasPendingEvent) {
      showTimeEvent();
    }
    else {
      $scope.activeEvent = -1;
    }
  }
  $scope.goToNewsetEvent = function() {
    $scope.hasPendingEvent = false;
    $scope.activeEvent = $scope.pendingEventsStack.pop() + 1;
    //console.log('Should move to event ' + $scope.events[$scope.activeEvent].name); 
  }
  $scope.totalCountdoun = function(){
    return  ((100 - $scope.seekerPos)/10*timeMultiplier).toString().toHHMMSS();
  }
}]);