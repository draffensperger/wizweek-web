(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController(GApi, $log) {
    var vm = this;
    vm.calendars = [];
    vm.weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    vm.settings = {
      appointmentsCalId: null, tasksCalId: null,
      workStartTimes: [], workEndTimes: []
    };

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
          console.log(vm.calendars);
        },
        function() {
          vm.calendars = [];
          $log.debug('Calendar call failed!');
        }
      );
    }
  }
})();
