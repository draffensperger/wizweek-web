(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('eventSync', eventSync);

  /** @ngInject */
  function eventSync(gcal, $q) {
    var service = {
      syncEvents: syncEvents
    };
    return service;

    // Note that the oldEvents and newTasks have slightly different formats.
    // This is due to the fact that oldEvents comes from the Google calendar
    // api, whereas newTasks comes from the schedule optimizer service.
    function syncEvents(tasksCalId, oldEvents, newTasks) {
      //PUT https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId
      //DELETE https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId
      //debugger;
      var requests = [];

      for (var i = 0, len = newTasks.length; i < len; i++) {
        if (i < oldEvents.length) {
          if (!eventAndTaskMatch(oldEvents[i], newTasks[i])) {
            requests.push(updateRequest(oldEvents[i], newTasks[i]));
          }
        } else {
          requests.push(createRequest(newTasks[i]));
        }
      }
      for (var k = newTasks.length; k < oldEvents.length; k++) {
        requests.push(deleteRequest(oldEvents[k]));
      }

      if (requests.length > 0) {
        gcal.eventUpdatesBatch(tasksCalId, requests);
      } else {
        return $q.resolve();
      }
    }

    function updateRequest(oldEvent, newTask) {
      return { method: 'PUT', id: oldEvent.id, data: taskData(newTask) };
    }

    function createRequest(newTask) {
      return { method: 'POST', data: taskData(newTask) };
    }

    function deleteRequest(oldEvent) {
      return { method: 'DELETE', id: oldEvent.id };
    }

    function taskData(newTask) {
      return {
        summary: newTask.title, start: { dateTime: newTask.start },
        end: { dateTime: newTask.end }
      };
    }

    function eventAndTaskMatch(oldEvent, newTask) {
      return oldEvent.summary == newTask.title &&
        dateStrsMatch(oldEvent.start.dateTime, newTask.start) &&
          dateStrsMatch(oldEvent.end.dateTime, newTask.end);
    }

    function dateStrsMatch(str1, str2) {
      return new Date(str1).getTime() == new Date(str2).getTime();
    }
  }
})();
