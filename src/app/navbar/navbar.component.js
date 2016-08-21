(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwNavbar', {
    controller: NavbarController,
    controllerAs: 'navbar',
    templateUrl: 'app/navbar/navbar.html'
  });

  /** @ngInject */
  function NavbarController(auth, lastSignIn, $state) {
    var vm = this;
    vm.auth = auth;
    vm.lastSignIn = lastSignIn;
    vm.isActive = isActive;
    vm.state = $state;

    function isActive(state) {
      return $state.current.name == state;
    }
  }
})();
