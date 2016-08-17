(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwNavbar', {
    controller: NavbarController,
    controllerAs: 'navbar',
    templateUrl: '/app/navbar/navbar.html'
  });

  /** @ngInject */
  function NavbarController(auth, lastSignIn, $state) {
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
