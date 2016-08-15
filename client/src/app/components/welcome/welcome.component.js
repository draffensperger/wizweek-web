(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwWelcome', {
    templateUrl: 'app/components/welcome/welcome.html',
    controller: WelcomeController
  });

  /** @ngInject */
  function WelcomeController(auth) {
    var vm = this;
    vm.auth = auth;

    activate();

    function activate() {
    }
  }
})();
