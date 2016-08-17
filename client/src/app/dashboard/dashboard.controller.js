(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
