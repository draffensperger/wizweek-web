(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('AuthorizedController', AuthorizedController);

  /** @ngInject */
  function AuthorizedController(auth, lastSignIn) {
    var vm = this;
    vm.auth = auth;
    vm.lastSignIn = lastSignIn;
  }
})();
