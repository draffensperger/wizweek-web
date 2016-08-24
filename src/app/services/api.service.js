(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('api', api);

  /** @ngInject */
  function api(apiBaseUrl, auth, $http) {
    var service = {
      ping: ping,
      put: put,
      get: get,
      request: request
    };
    return service;

    // This is helpful since I currently run the API on a free heroku dyno
    // (so this ping call will wake up the API when the app is first loaded).
    function ping() {
      get('');
    }

    function get(url) {
      return request('GET', url);
    }

    function put(url, data) {
      return request('PUT', url, data);
    }

    function request(method, url, data) {
      return $http({
        method: method,
        url: apiBaseUrl + url,
        data: data,
        headers: { 'Authorization': 'Bearer ' + auth.token }
      });
    }
  }
})();
