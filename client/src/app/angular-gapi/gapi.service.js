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

    function get() {
      if (gapiLoaded) {
        return $q.when($window.gapi);
      } else {
        var deferred = $q.defer();
        observerCallbacks.push(deferred);
        if (!gapiLoading) {
          gapiLoading = true;
          loadScript().then(function() {
            gapiLoaded = true;
            gapiLoading = false;
            observerCallbacks.forEach(function(c) { c.resolve($window.gapi); });
          });
        }
        return deferred.promise;
      }
    }

    function loadScript() {
      var URL = 'https://apis.google.com/js/api.js?onload=_gapiOnLoad';

      var deferred = $q.defer();
      $window._gapiOnLoad = function(){
        deferred.resolve();
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
