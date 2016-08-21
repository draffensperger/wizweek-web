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
      controller: 'DashboardController',
      controllerAs: 'dash'
    })
    .state('main.authorized.settings', {
      url: '/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: '$ctrl'
    })
    .state('todomvc', {
      url: '/todo',
			controller: 'TodoCtrl',
			templateUrl: 'app/todomvc/todomvc.html',
      store: function (todoStorage) {
        // Get the correct module (API or localStorage).
        return todoStorage.then(function (module) {
          module.get(); // Fetch the todo records in the background.
            return module;
        });
      }
    })

    $urlRouterProvider.otherwise('/');
  }

})();
