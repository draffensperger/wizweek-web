/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('gapiScopes', 'https://www.googleapis.com/auth/calendar')
    .constant('gapiClientId', '562801966668-qu83ib47l7bqcddpvd7qtkescdohg4e7.apps.googleusercontent.com')
    .constant('apiBaseUrl', 'https://wizweek-api.herokuapp.com/')
    //.constant('apiBaseUrl', 'http://localhost:8000/')

})();
