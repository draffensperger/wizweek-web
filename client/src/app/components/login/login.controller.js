(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(auth) {
    var vm = this;
    vm.auth = auth;
    vm.loginWithGoogle = loginWithGoogle;

    activate();

    function activate() {
    }

    function loginWithGoogle() {
      auth.login();
    }
  }
})();
