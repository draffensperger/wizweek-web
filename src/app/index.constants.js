/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('gapiScopes', 'https://www.googleapis.com/auth/calendar')
    .constant('gapiClientId', '944131974902-59t0ekqanbv7krguorbl3c0fk5rosika.apps.googleusercontent.com')
})();
