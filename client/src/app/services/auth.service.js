(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('auth', auth);

  /** @ngInject */
  function auth(GAuth, gapiScopes, gapiClientId, $state, $rootScope) {
    GAuth.setConfig({
      clientId: gapiClientId,
      scope: gapiScopes,
      currentUserListener: currentUserChanged
    });

    var service = {
      checkAuth: checkAuth,
      signIn: signIn,
      signOut: signOut,
      signedIn: false,
      signingIn: false,
      userEmail: null,
      userName: null
    }
    return service;

    function currentUserChanged(user) {
      service.signingIn = false;
      service.signedIn = user.isSignedIn();
      if (service.signedIn) {
        service.userEmail = user.getBasicProfile().getEmail();
        service.userName = user.getBasicProfile().getName();
        $state.go('home');
      } else {
        service.userEmail = null;
        service.userName = null;
        $state.go('login');
      }
      $rootScope.$digest();
    }

    function checkAuth() {
      GAuth.checkAuth();
    }

    function signIn() {
      service.signingIn = true;
      GAuth.signIn();
    }

    function signOut() {
      GAuth.signOut();
    }
  }
})();
