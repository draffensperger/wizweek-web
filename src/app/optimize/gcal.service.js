(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('gcal', gcal);

  function gcal(GApi) {
    var service = {
      calendarInfo: calendarInfo,
      events: events,
      eventUpdatesBatch: eventUpdatesBatch,
      rejectAllDayEvents: rejectAllDayEvents
    };
    return service;

    function events(calId, timeMin, timeMax) {
      var path = calPath(calId) + "/events?timeMin=" + timeMin.toISOString() +
        "&timeMax=" + timeMax.toISOString();

      return GApi.request(path).then(function(resp) {
        return resp.result.items;
      });
    }

    function eventUpdatesBatch(calId, eventUpdates) {
      var requests = eventUpdates.map(function(update) {
        var path = calPath(calId) + '/events';
        if (update.id) {
          path += '/' + update.id;
        }
        return { path: path, method: update.method, body: update.data };
      });
      return GApi.batch(requests);
    }

    function calendarInfo(calId) {
      return GApi.request(calPath(calId)).then(function(resp) {
        return resp.result;
      });
    }

    function calPath(calId) {
      return 'calendar/v3/calendars/' + calId;
    }

    function rejectAllDayEvents(events) {
      return events.filter(isNotAllDayEvent, events);
    }

    function isNotAllDayEvent(event) {
      return event['start']['dateTime'];
    }
  }
})();
