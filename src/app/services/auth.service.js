(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('auth', auth);

  /** @ngInject */
  function auth(GAuth, gapiScopes, gapiClientId, $state, $rootScope, lastSignIn) {
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
      userName: null,
      token: null
    }
    return service;

    function currentUserChanged(user) {
      service.signingIn = false;
      service.signedIn = user.isSignedIn();
      if (service.signedIn) {
        service.userEmail = user.getBasicProfile().getEmail();
        service.userName = user.getBasicProfile().getName();
        service.token = user.getAuthResponse().access_token;
        lastSignIn.signedIn(user.getAuthResponse().expires_at);
      } else {
        service.userEmail = null;
        service.userName = null;
        service.token = null;
        lastSignIn.signedOut();
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
