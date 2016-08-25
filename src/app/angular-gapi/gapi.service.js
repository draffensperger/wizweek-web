(function() {
  'use strict';

  angular
  .module('angular-gapi')
  .service('GApi', GApi);

  /** @ngInject */
  function GApi($q, $document, $window, $timeout) {
    var gapiLoaded = false;
    var gapiLoading = false;
    var observerCallbacks = [];

    this.get = get;
    this.request = request;
    this.batch = batch;

    function batch(requests) {
      console.log(requests);
      if (requests.length == 0) {
        return $q.resolve();
      }

      return get().then(function(gapi) {
        var batch = gapi.client.newBatch();
        requests.forEach(function(req) {
          batch.add(gapi.client.request(req));
        })
        return batch;
      });
    }

    function request(args) {
      return get().then(function(gapi) {
        return gapi.client.request(args);
      });
    }

    function get() {
      if (gapiLoaded) {
        return $q.when($window.gapi);
      } else {
        var deferred = $q.defer();
        observerCallbacks.push(deferred);
        if (!gapiLoading) {
          gapiLoading = true;
          loadWithClientAndAuth().then(function(gapi) {
            gapiLoaded = true;
            gapiLoading = false;
            observerCallbacks.forEach(function(c) { c.resolve(gapi); });
          });
        }
        return deferred.promise;
      }
    }

    function loadWithClientAndAuth() {
      var deferred = $q.defer();
      loadScript().then(function(gapi) {
        gapi.load('client:auth2', function() {
          deferred.resolve(gapi);
        });
      });
      return deferred.promise;
    }

    function loadScript() {
      var URL = 'https://apis.google.com/js/api.js?onload=_gapiOnLoad';

      var deferred = $q.defer();
      $window._gapiOnLoad = function(){
        deferred.resolve($window.gapi);
      }
      var script = $document[0].createElement('script');
      script.onerror = function (e) {
        $timeout(function () {
          deferred.reject(e);
        });
      };
      script.src = URL;
      $document[0].body.appendChild(script);
      return deferred.promise;
    }
  }
})();
