(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwDashboard', {
    controller: DashboardController,
    controllerAs: 'dash',
    templateUrl: '/app/dashboard/dashboard.html'
  });

  /** @ngInject */
  function DashboardController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
