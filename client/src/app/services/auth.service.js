(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('auth', auth);

  /** @ngInject */
  function auth(GAuth, gapiScopes, gapiClientId, $state, $log) {
    GAuth.setConfig({
      clientId: gapiClientId,
      scope: gapiScopes,
      signedInListener: signedInChanged,
      currentUserListener: currentUserChanged
    });

    var service = {
      checkAuth: checkAuth,
      login: login,
      logout: logout,
      loggedIn: false,
      loggingIn: false,
      user: null
    }
    return service;

    function signedInChanged() {
    }

    function currentUserChanged(currentUser) {
      if (currentUser) {
        loggedIn(currentUser);
      } else {
        notLoggedIn();
      }
    }

    function checkAuth() {
      GAuth.checkAuth();
    }

    function login() {
      service.loggingIn = true;
      GAuth.signIn();
    }

    function logout() {
      GAuth.signOut();
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
