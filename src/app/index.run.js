(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .run(runBlock);

  /** @ngInject */
  function runBlock(auth, api) {
    auth.checkAuth();

    // Just ping the API to wake it up (it runs on a free Heroku dyno)
    api.get('/');
  }
})();
