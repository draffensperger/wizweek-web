(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController(GApi, $log) {
    var vm = this;
    vm.calendars = [];

    activate();

    function activate() {
      getCalendars();
    }

    function getCalendars() {
      GApi.request({
        path: '/calendar/v3/users/me/calendarList'
      }).then(
        function(resp) {
          vm.calendars = resp.result.items;
        },
        function() {
          vm.calendars = [];
          $log.debug('Calendar call failed!');
        }
      );
    }
  }
})();
