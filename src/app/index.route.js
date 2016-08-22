(function() {
  'use strict';

  angular
    .module('wizweekPy')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('main',  {
      abstract: true,
      templateUrl: 'app/layout/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('main.authorized', {
      abstract: true,
      templateUrl: 'app/layout/authorized.html',
      controller: 'AuthorizedController',
      controllerAs: 'authorized'
    })
    .state('main.authorized.dashboard', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'TodoController',
      controllerAs: 'dash'
    })
    .state('main.authorized.settings', {
      url: '/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: '$ctrl'
    })

    $urlRouterProvider.otherwise('/');
  }

})();
