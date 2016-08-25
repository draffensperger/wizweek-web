(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('settingsStore', settingsStore);

  /** @ngInject */
  function settingsStore($q, $window, api) {
    var settings = null;

    var defaultSettings = {
      appointmentsCalId: null, tasksCalId: null,

      // Default work times are 9am-5pm Mon-Fri and just an empty 9am-9am for
      // Sun (first day of week) and Sat (last day of week).
      workStartTimes: Array(7).fill(new Date(0, 0, 0, 9)),
      workEndTimes: [new Date(0, 0, 0, 9)].concat(
        Array(5).fill(new Date(0, 0, 0, 17))).concat(
        [new Date(0, 0, 0, 9)])
    }

    var service = {
      load: load,
      save: save
    }
    return service;

    function save(value) {
      return api.put('settings', value);
    }

    function load() {
      if (settings) {
        // If we've already loaded the settings once, just give that.
        return $q.resolve(settings);
      } else {
        return api.get('settings').then(function(resp) {
          // If the loaded settings lack any of the settings attributes, we will
          // get them from the default settings.
          settings = angular.extend({}, defaultSettings, resp.data);
          parseDates(settings.workStartTimes);
          parseDates(settings.workEndTimes);
          return settings;
        });
      }
    }

    function parseDates(values) {
      for (var i = 0; i < values.length; i++) {
        values[i] = new Date(values[i]);
      }
    }
  }
})();
