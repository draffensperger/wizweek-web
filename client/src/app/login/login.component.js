(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwLogin', {
    controller: LoginController,
    controllerAs: 'login',
    templateUrl: '/app/login/login.html'
  });

  /** @ngInject */
  function LoginController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
