(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('settingsStore', settingsStore);

  /** @ngInject */
  function settingsStore($q, $window, api) {
    var settings = null;

    var service = {
      load: load,
      save: save
    }
    return service;

    function save(value) {
      return api.put('settings', value);
    }

    function load(defaultSettings) {
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
