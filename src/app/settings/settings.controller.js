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

    vm.settings = {};
    vm.saveSettings = saveSettings;

    activate();

    function activate() {
      loadCalendars();
      loadSettings();
    }

    function loadSettings() {
      settingsStore.load().then(function(loadedSettings) {
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
