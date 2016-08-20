(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('api', api);

  /** @ngInject */
  function api(auth, $http) {
    var service = {
      saveSettings: saveSettings,
      loadSettings: loadSettings
    };
    return service;

    function loadSettings() {
      return $http.get(
        'https://wizweek-api.herokuapp.com/settings',
        { headers: { 'Authorization': 'Bearer ' + auth.token } }
      );
    }

    function saveSettings(settings) {
      return $http.put(
        'https://wizweek-api.herokuapp.com/settings',
        settings,
        { headers: { 'Authorization': 'Bearer ' + auth.token } }
      )
    }
  }
})();
