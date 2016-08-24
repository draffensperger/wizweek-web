(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('gcal', gcal);

  function gcal(GApi) {
    var service = {
      events: events
    };
    return service;

    function events(calId, timeMin, timeMax) {
      var url = calUrl(calId) + "/events?timeMin=" + timeMin.toISOString() +
        "&timeMax=" + timeMax.toISOString();
        url

      return GApi.request(url).then(function(resp) {
        return resp.result.items;
      });
    }

    function calUrl(calId) {
      return 'calendar/v3/calendars/' + calId;
    }
  }
})();
