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
  function MainController(auth, lastSignIn, $state) {
    var vm = this;
    vm.auth = auth;
    vm.lastSignIn = lastSignIn;
    vm.isActive = isActive;

    function isActive(state) {
      console.log(state);
      console.log($state);
      return $state.current.name == state;
    }
  }
})();
