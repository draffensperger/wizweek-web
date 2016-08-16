(function() {
  'use strict';

  angular
  .module('angular-gapi')
  .service('GAuth', GAuth);

  /** @ngInject */
  function GAuth(GApi, $q) {
    var config;
    var cachedAuth2 = null;
    var initialized = false;

    var service = {
      setConfig: setConfig,
      checkAuth: checkAuth,
      signIn: signIn,
      signOut: signOut
    };
    return service;

    // Takes an object like this:
    // {
    //   clientId: 'xyz.apps.googleusercontent.com',
    //   scope: 'https://www.googleapis.com/auth/calendar',
    //   currentUserListener: function(currentUser) { ... }
    // }
    function setConfig(conf) {
      config = conf;
    }

    function signIn() {
      init().then(function(auth2) {
        auth2.getAuthInstance().signIn();
      });
    }

    function signOut() {
      init().then(function(auth2) {
        auth2.getAuthInstance().signOut();
      });
    }

    function checkAuth() {
      // init() checks the authentiation but by just calling it (but not
      // returning it) we avoid exposing promise that would return the auth2 instance.
      init();
    }

    function init() {
      if (initialized) {
        return get();
      } else {
        return get().then(function(auth2) {
          auth2.init({ client_id: config.clientId, scope: config.scope });
          setupListeners(auth2);
          initialized = true;
          return auth2;
        });
      }
    }

    function setupListeners(auth2) {
      var authInstance = auth2.getAuthInstance();
      authInstance.currentUser.listen(config.currentUserListener);
      config.currentUserListener(authInstance.currentUser.get());
    }

    function get() {
      if (cachedAuth2) {
        return $q.resolve(cachedAuth2);
      } else {
        var deferred = $q.defer();
        GApi.get().then(function(gapi) {
          gapi.load('client:auth2', function() {
            cachedAuth2 = gapi.auth2;
            deferred.resolve(gapi.auth2);
          });
        });
        return deferred.promise;
      }
    }
  }
})();
