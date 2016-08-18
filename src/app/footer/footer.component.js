(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .component('wwFooter', {
    controller: FooterController,
    controllerAs: 'footer',
    templateUrl: 'app/footer/footer.html'
  });

  /** @ngInject */
  function FooterController() {
  }
})();
