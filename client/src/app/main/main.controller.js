(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(auth, lastSignIn) {
    var vm = this;
    vm.auth = auth;
    vm.lastSignIn = lastSignIn;
  }
})();
