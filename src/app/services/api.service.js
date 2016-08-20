(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('api', api);

  /** @ngInject */
  function api(apiBaseUrl, auth, $http) {
    var service = {
      put: put,
      get: get,
      request: request
    };
    return service;

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
