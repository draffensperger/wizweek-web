(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('settingsStore', settingsStore);

  /** @ngInject */
  function settingsStore($q, $window) {
    var service = {
      load: load,
      save: save
    }
    return service;

    function save(value) {
      $window.localStorage.settings = angular.toJson(value);
      return $q.resolve();
    }

    function load(defaultValue) {
      var settingsStored = $window.localStorage.settings;
      var value;
      if (settingsStored) {
        value = angular.fromJson(settingsStored);
      } else {
        value = defaultValue;
      }
      return $q.resolve(value);
    }
  }
})();
