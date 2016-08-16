(function() {
  'use strict';

  angular
  .module('angular-gapi')
  .service('GApi', GApi);

  /** @ngInject */
  function GApi($q, $document, $window) {
    var gapiLoaded = false;
    var gapiLoading = false;
    var observerCallbacks = [];

    this.get = get;

    function get() {
      var deferred = $q.defer();
      if(gapiLoaded)
        deferred.resolve($window.gapi);
      else {
        observerCallbacks.push(deferred);
        if(!gapiLoading) {
          gapiLoading = true;
          loadScript(URL).then(function() {
            gapiLoaded = true;
            gapiLoading = false;
            observerCallbacks.forEach(function(c) { c.resolve($window.gapi); })
          });
        }
      }
      return deferred.promise;
    }

    function loadScript() {
      var URL = 'https://apis.google.com/js/client.js?onload=_gapiOnLoad';

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
    };
  }
})();
