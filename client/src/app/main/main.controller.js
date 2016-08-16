(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
