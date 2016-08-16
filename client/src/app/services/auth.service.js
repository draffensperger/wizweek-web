(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('auth', auth);

  /** @ngInject */
  function auth(GAuth, gapiScopes, gapiClientId, $state, $log) {
    GAuth.setScope(gapiScopes);
    GAuth.setClient(gapiClientId);

    var service = {
      checkAuth: checkAuth,
      login: login,
      logout: logout,
      loggedIn: false,
      loggingIn: false,
      user: null
    }
    return service;

    function checkAuth() {
      GAuth.checkAuth().then(loggedIn, notLoggedIn);
    }

    function login() {
      service.loggingIn = true;
      GAuth.signIn().then(loggedIn, notLoggedIn);
    }

    function logout() {
      GAuth.logout().then(notLoggedIn);
    }

    function loggedIn(user) {
      service.loggingIn = false;
      service.loggedIn = true;
      service.user = user;
      $state.go('home');
      $log.debug(user);
    }

    function notLoggedIn() {
      service.loggingIn = false;
      service.loggedIn = false;
      service.user = null;
      $state.go('login');
    }
  }
})();
