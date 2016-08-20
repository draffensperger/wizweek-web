(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController(GApi, $log, settingsStore, toastr) {
    var vm = this;
    vm.calendars = [];
    vm.weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var defaultSettings = {
      appointmentsCalId: null, tasksCalId: null,

      // Default work times are 9am-5pm Mon-Fri and just an empty 9am-9am for
      // Sun (first day of week) and Sat (last day of week).
      workStartTimes: Array(7).fill(new Date(0, 0, 0, 9)),
      workEndTimes: [new Date(0, 0, 0, 9)].concat(
        Array(5).fill(new Date(0, 0, 0, 17))).concat(
        [new Date(0, 0, 0, 9)])
    }

    vm.settings = {};
    vm.saveSettings = saveSettings;

    activate();

    function activate() {
      loadCalendars();
      loadSettings();
    }

    function loadSettings() {
      settingsStore.load(defaultSettings).then(function(loadedSettings) {
        vm.settings = loadedSettings;
      });
    }

    function saveSettings() {
      settingsStore.save(vm.settings).then(function() {
        toastr.success('Settings saved!');
      });
    }

    function loadCalendars() {
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
