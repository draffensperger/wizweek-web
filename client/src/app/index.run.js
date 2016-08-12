(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
