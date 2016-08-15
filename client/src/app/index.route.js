(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mail'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
