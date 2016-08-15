(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('auth', auth);

  /** @ngInject */
  function auth(GAuth, gapiScopes, gapiClientId, $state) {
    GAuth.setScope(gapiScopes);
    GAuth.setClient(gapiClientId);

    var service = {
      checkAuth: checkAuth,
      login: login,
      loggedIn: false,
      user: null
    }
    return service;

    function checkAuth() {
      GAuth.checkAuth().then(loggedIn, notLoggedIn);
    }

    function login() {
      debugger;
      GAuth.login().then(loggedIn, notLoggedIn);
    }

    function loggedIn(user) {
      service.loggedIn = true;
      service.user = user;
      $state.go('home');
    }

    function notLoggedIn() {
      service.loggedIn = false;
      $state.go('login');
    }
  }
})();
