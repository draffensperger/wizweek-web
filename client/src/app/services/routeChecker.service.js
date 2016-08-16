(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('routeChecker', routeChecker);

  /** @ngInject */
  function routeChecker($rootScope, $location, $urlRouter, lastSignIn, auth) {
    var routesOpenToPublic = [];

    var service = {
      setup: setup
    }
    return service;

    // Taken from http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition
    function setup() {
      setupPublicRoutes();
      var deregister = $rootScope.$on('$stateChangeStart', stateChangeStart);
      $rootScope.$on('$destroy', deregister);
    }

    function setupPublicRoutes() {
      angular.forEach($urlRouter.routes, function(route, path) {
        if (route.publicAccess) {
          routesOpenToPublic.push(path)
        }
      });
    }

    function stateChangeStart() {
      var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
      if(closedToPublic && !likelySignedIn()) {
        $location.path('/login');
      } else if ($location.path() == '/login' && auth.signedIn) {
        // Redirect to home if already logged in.
        $location.path('/');
      }
    }

    function likelySignedIn() {
      return auth.isSignedIn || lastSignIn.isLikelyActive();
    }
  }
})();
