(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController(auth) {
    var vm = this;
    vm.auth = auth;
  }
})();
