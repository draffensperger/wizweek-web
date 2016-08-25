(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .service('optimizeApi', optimizeApi);

  /** @ngInject */
  function optimizeApi(optimizeUrl, $http) {
    var service = {
      ping: ping,
      optimize: optimize
    };
    return service;

    function ping() {
      return $http.get(optimizeUrl);
    }

    function optimize(request) {
      return $http.post(optimizeUrl, request).then(function(response) {
        return response.data;
      });
    }
  }
})();
