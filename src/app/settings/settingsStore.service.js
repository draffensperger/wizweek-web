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
      return api.saveSettings(value);
    }

    function load(defaultValue) {
      if (settings) {
        // If we've already loaded the settings once, just give that.
        return $q.resolve(settings);
      } else {
        return api.loadSettings();
      }
    }

    function parseDates(values) {
      for (var i = 0; i < values.length; i++) {
        values[i] = new Date(values[i]);
      }
    }
  }
})();
