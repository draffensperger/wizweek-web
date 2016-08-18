(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwWelcome', {
    controller: WelcomeController,
    controllerAs: 'welcome',
    templateUrl: 'app/welcome/welcome.html'
  });

  /** @ngInject */
  function WelcomeController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
