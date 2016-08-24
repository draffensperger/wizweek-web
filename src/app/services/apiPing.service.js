(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .service('apiPing', apiPing);

  /** @ngInject */
  function apiPing(api) {
    var service = {
      ping: ping
    };
    return service;

    function ping() {
      api.get('/');
    }
  }
})();
