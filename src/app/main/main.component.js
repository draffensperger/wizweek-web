(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwMain', {
    controller: MainController,
    controllerAs: 'main',
    templateUrl: '/app/main/main.html'
  });

  /** @ngInject */
  function MainController(auth, lastSignIn) {
    var vm = this;
    vm.auth = auth;
    vm.lastSignIn = lastSignIn;

    activate();

    function activate() {
      //auth.checkAuth();
    }
  }
})();
