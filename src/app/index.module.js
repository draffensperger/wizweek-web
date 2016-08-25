(function() {
  'use strict';

  // This module is empty except for the template cache that's used in
  // production.
  angular
    .module('wizweekTemplates', [])

  angular
    .module('wizweekPy', [
      'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria',
      'ngResource', 'ui.router', 'ui.bootstrap', 'toastr',
      'angularSpinner', 'wizweekTemplates'
    ]);

})();
