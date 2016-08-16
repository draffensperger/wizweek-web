(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('lastSignIn', lastSignIn);

  /** @ngInject */
  function lastSignIn($window) {
    var service = {
      isLikelyActive: isLikelyActive,
      signedIn: signedIn,
      signedOut: signedOut
    }
    return service;

    function signedIn(expiresAt) {
      $window.localStorage.signInExpiry = expiresAt;
    }

    function signedOut() {
      $window.localStorage.signInExpiry = 0;
    }

    function isLikelyActive() {
      var signInExpiry = $window.localStorage.signInExpiry;
      if (!signInExpiry) {
        return false;
      } else {
        var msLeft = parseInt(signInExpiry) - new Date().getTime();
        return msLeft > 0;
      }
    }
  }
})();
