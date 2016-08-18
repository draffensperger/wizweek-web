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
      templateUrl: 'app/layout/main.html'
    })
    .state('main.authorized', {
      abstract: true,
      templateUrl: 'app/layout/authorized.html'
    })
    .state('main.authorized.home', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
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
