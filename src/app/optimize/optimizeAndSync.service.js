(function() {
  'use strict';

  angular
  .module('wizweekPy')
  .service('optimizeAndSync', optimizeAndSync);

  /** @ngInject */
  function optimizeAndSync(gcal, settingsStore, optimizer, $q, eventSync) {
    var service = {
      exec: exec
    };
    return service;

    function exec(tasks, msgCallback, doneCallback) {
      var settings, appointments, tasksCalInfo, optimizedEvents, currentEvents;
      var taskEventsPromise, optimizePromise;

      var curTime = new Date();
      var scheduleStart = new Date(
        curTime.getFullYear(), curTime.getMonth(), curTime.getDate(),
        curTime.getHours() + 1
      );
      var scheduleEnd = new Date(scheduleStart);
      scheduleEnd.setDate(scheduleStart.getDate() + 90);

      loadSettings();

      function loadSettings() {
        msgCallback('Loading settings...');
        settingsStore.load().then(function(loadedSettings) {
          settings = loadedSettings;
          loadEvents();
        });
      }

      function loadEvents() {
        loadAppointments();

        // Start loading the task events for the range right away, but also
        // track its promoise so we can wait until it's done.
        taskEventsPromise = gcal.events(
          settings.tasksCalId, scheduleStart, scheduleEnd
        );
      }

      function loadAppointments() {
        msgCallback('Loading appointments...');
        var apptsPromise =
          gcal.events(settings.appointmentsCalId, scheduleStart, scheduleEnd);

        var infoPromise = gcal.calendarInfo(settings.tasksCalId);

        $q.all([apptsPromise, infoPromise]).then(function(results) {
          appointments = gcal.rejectAllDayEvents(results[0]);
          tasksCalInfo = results[1];
          runOptimizer();
        });
      }

      function runOptimizer() {
        msgCallback('Running optimizer...');
        optimizePromise = optimizer.exec(
          tasks, tasksCalInfo, settings, appointments, scheduleStart, scheduleEnd
        );
        $q.all([taskEventsPromise, optimizePromise]).then(function(results) {
          currentEvents = results[0];
          optimizedEvents = results[1];
          syncEvents();
        }, function() {
          msgCallback('No feasible schedule found. Please check your tasks.');
          doneCallback();
        });
      }

      function syncEvents() {
        msgCallback('Syncing events to tasks calendar...');
        eventSync.syncEvents(settings.tasksCalId, currentEvents, optimizedEvents).
          then(function() {
            msgCallback('Optimized schedule has been synced to your tasks calendar.');
            doneCallback();
          });
      }
    }
  }
})();
