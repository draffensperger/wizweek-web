(function() {
  'use strict';

  angular
  .module('angular-gapi')
  .service('GAuth', GAuth);

  /** @ngInject */
  function GAuth(GApi, $q) {
    var clientId = null;
    var scope = '';
    var cachedAuth2 = null;
    var initialized = false;

    var service = {
      checkAuth: checkAuth,
      setClient: setClient,
      setScope: setScope
    };
    return service;

    function setClient(clientIdVal) {
      clientId = clientIdVal;
    }

    function setScope(scopeVal) {
      scope = scopeVal;
    }

    function checkAuth() {
      var deferred = $q.defer();
      init().then(function (auth2) {
        var authInstance = auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          deferred.resolve(authInstance.currentUser.get());
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    }

    function init() {
      if (initialized) {
        return get();
      } else {
        return get().then(function(auth2) {
          auth2.init({ client_id: clientId, scope: scope })
          initialized = true;
          return auth2;
        });
      }
    }

    function get() {
      if (cachedAuth2) {
        $q.when(cachedAuth2);
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
