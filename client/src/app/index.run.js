(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .run(runBlock);

  /** @ngInject */
  function runBlock(auth, routeChecker) {
    routeChecker.setup();
    auth.checkAuth();
  }
})();
