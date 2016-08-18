(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .run(runBlock);

  /** @ngInject */
  function runBlock(auth) {
    auth.checkAuth();
  }
})();
